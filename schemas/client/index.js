const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: String,
  country: String,
  xeroId: String,
  phone: String,
  email: String,
  contactPerson: String
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
