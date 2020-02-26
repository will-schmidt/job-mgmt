const mongoose = require("mongoose");

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

module.exports = mongoose.model("Job", jobSchema);
