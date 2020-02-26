const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const mongoose = require("mongoose");
const Client = require("./schemas/client");
const Job = require("./schemas/job");
const Note = require("./schemas/note");
const User = require("./schemas/user");

require("dotenv").config();

app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/jobs", (req, res) => {
  const response = Job.find()
    .populate("client")
    .then(data => res.send(data));
});

app.post("/add-client", (req, res) => {
  const { body } = req;
  const client = new Client(body);

  client.save().then(() => console.log("New client added"));
  res.sendStatus(200);
});

app.get("/clients", (req, res) => {
  const response = Client.find().then(data => res.send(data));
});

app.post("/sign-up", (req, res) => {
  const { body } = req;
  const user = new User(body);

  user.save().then(() => console.log("User created!"));
  res.sendStatus(200);
});

app.get("/users", (req, res) => {
  const response = User.find().then(data => res.send(data));
});

app.post("/create-note", async (req, res) => {
  const { body } = req;
  // rest operator
  const { email, jobId, ...restOfNote } = body;
  const foundUser = await User.findOne({ email });
  const foundJob = await Job.findById(jobId);
  const note = new Note(restOfNote);

  note.createdBy = foundUser._id;
  note.job = foundJob._id;

  note.save().then(() => {
    console.log("New note added");
    res.sendStatus(200);
  });
});

app.get("/get-notes", (req, res) => {
  const response = Note.find()
    .populate("createdBy")
    .populate("job")
    .then(data => res.send(data));
});

app.post("/add-job", async (req, res) => {
  try {
    const { body } = req;
    // rest operator
    const { client, ...restOfJob } = body;
    const foundClient = await Client.findOne({ name: client });
    const job = new Job(restOfJob);
    job.client = foundClient._id;
    job.save().then(() => {
      console.log("New job added");
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
