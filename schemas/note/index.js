const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  body: String,
  dateCreated: Date,
  dateUpdated: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
});

module.exports = mongoose.model("Note", noteSchema);
