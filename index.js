const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Client = require("./schemas/client");
const Job = require("./schemas/job");
const JobNote = require("./schemas/jobNote");
const User = require("./schemas/user");
const cookieParser = require("cookie-parser");
const utils = require("./utils");
const port = 5000;

const getUserFromToken = token =>
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    return utils.getCleanUser(user);
  });

require("dotenv").config();

app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", err => {
  console.log("> error occurred from the database", err.message);
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

app.get("/jobs", (req, res) => {
  const token = req.headers["x-token"];
  const user = getUserFromToken(token);

  console.log("/jobs", user);

  const response = Job.find()
    .populate("client")
    .populate("responsible")
    .then(data => res.send(data));
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await await Job.findById(req.params.id)
      .populate("client")
      .populate("responsible");

    if (!job) return res.status(404).send({error: "Not Found"});

    return res.send({job});
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({error: "Not a valid ID"});
    } else {
      return res.status(500).send({error: "Internal Error"});
    }
  }
});

app.post("/add-client", (req, res) => {
  const {body} = req;
  const client = new Client(body);

  client.save().then(() => console.log("New client added"));
  res.sendStatus(200);
});

app.get("/clients", (req, res) => {
  const response = Client.find().then(data => res.send(data));
});

app.get("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) return res.status(404).send({error: "Not Found"});

    return res.send({client});
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({error: "Not a valid ID"});
    } else {
      return res.status(500).send({error: "Internal Error"});
    }
  }
});

// POST route to register a user
app.post("/sign-up", (req, res) => {
  const {body} = req;
  const user = new User(body);

  user.save(function(err) {
    if (err) {
      console.log(err.message);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("/users/signin", function(req, res) {
  const {email, password} = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong."
          });
        } else {
          // generate token
          const token = utils.generateToken({
            email: user.email,
            password: user.password
          });
          // get basic user details
          const userObj = utils.getCleanUser({
            email: user.email,
            password: user.password
          });
          // return the token along with user details
          return res.json({user: userObj, token});
        }
      });
    }
  });
});

app.get("/verifyToken", function(req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
  }

  User.findOne({email: user.email}, function(err, foundUser) {
    if (!foundUser.email) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    return res.json({user, token});
  });
});

app.get("/users", (req, res) => {
  const response = User.find().then(data => res.send(data));
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send({error: "Not Found"});

    return res.send({user});
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({error: "Not a valid email"});
    } else {
      return res.status(500).send({error: "Internal Error"});
    }
  }
});

app.put("/update-user/:id", (req, res) => {
  const response = User.update({_id: req.params.id}, req.body)
    .then(res.sendStatus(200))
    .catch(function(err) {
      throw err; // or handle it
    });
});

app.post("/create-job-note", async (req, res) => {
  try {
    const {body} = req;
    // rest operator
    const {createdBy, job, ...restOfJobNote} = body;
    const foundUser = await User.findOne({_id: createdBy});
    const foundJob = await Job.findOne({_id: job});
    const jobNote = new JobNote(restOfJobNote);

    jobNote.createdBy = foundUser._id;
    jobNote.job = foundJob._id;

    jobNote.save().then(() => {
      console.log("New note added");
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.get("/get-job-notes", (req, res) => {
  const response = JobNote.find()
    .populate("createdBy")
    .populate("job")
    .then(data => res.send(data));
});

// NOt working
app.get("/get-job-notes/:id", async (req, res) => {
  try {
    const jobNotes = await JobNote.find({job: req.params.id}).populate(
      "createdBy"
    );

    if (!jobNotes) return res.status(404).send({error: "Not Found"});

    return res.send({jobNotes});
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({error: "Not a valid ID"});
    } else {
      return res.status(500).send({error: "Internal Error"});
    }
  }
});

app.post("/add-job", async (req, res) => {
  try {
    const {body} = req;
    console.log({headers: req.headers});
    // rest operator
    const {client, responsible, ...restOfJob} = body;
    const foundClient = await Client.findOne({_id: client});
    const foundUser = await User.findOne({_id: responsible});
    const job = new Job(restOfJob);
    job.client = foundClient._id;
    job.responsible = foundUser._id;
    job.save().then(() => {
      console.log("New job added");
    });
    // .catch(error => console.log(error)) [Mongo error msg?]
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
