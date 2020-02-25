const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const mongoose = require("mongoose");

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

const clientSchema = new mongoose.Schema({
  name: String,
  country: String
});

const Client = mongoose.model("Client", clientSchema);

const jobSchema = new mongoose.Schema({
  name: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  type: String,
  responsible: String,
  cost: Number,
  value: Number,
  eta: Date,
  days: Number,
  status: String,
  notes: String
});

const Job = mongoose.model("Job", jobSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/jobs", (req, res) => {
  const response = Job.find()
    .populate("client")
    .then(data => res.send(data));
});

app.post("/add-job", (req, res) => {
  try {
    const { body } = req;
    const newJob = { ...body };
    if (!newJob.status) {
      newJob.status = "Started";
    }
    newJob.client = {
      name: newJob.client
    };
    const job = new Job(body);
    job.save().then(() => console.log("New job added"));
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
