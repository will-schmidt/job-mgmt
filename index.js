const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://dbUser:zu4UwRl9vEvuIDym@job-mgmt-clustor-zbi27.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)

const jobSchema = new mongoose.Schema({
  name: String,
  client: String
})

jobSchema.add({
  type: String,
  responsible: String,
  cost: Number,
  value: Number,
  eta: Date,
  days: Number,
  status: String,
  notes: String
})

const Job = mongoose.model('Job', jobSchema)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/jobs', (req, res) => {
  Job.find().then(data => res.send(data))
})

app.post('/add-job', (req, res) => {
  try {
    console.log(req.body)
    const job = new Job({
      name: req.body.name,
      client: req.body.client,
      value: req.body.value,
      type: req.body.type,
      responsible: req.body.responsible,
      cost: req.body.cost,
      eta: req.body.eta,
      days: req.body.days,
      status: req.body.status,
      notes: req.body.notes
    })
    job.save().then(() => console.log('New job added'))
    res.sendStatus(200)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
