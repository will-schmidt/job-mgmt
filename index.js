const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const mongoose = require('mongoose')
const Client = require('./schemas/client')
const Job = require('./schemas/job')
const JobNote = require('./schemas/jobNote')
const User = require('./schemas/user')

require('dotenv').config()

app.use(cors())

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('> error occurred from the database')
})
db.once('open', () => {
  console.log('> successfully opened the database')
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/jobs', (req, res) => {
  const response = Job.find()
    .populate('client')
    .populate('responsible')
    .then(data => res.send(data))
})

app.get('/jobs/:id', async (req, res) => {
  try {
    const job = await await Job.findById(req.params.id)
      .populate('client')
      .populate('responsible')

    if (!job) return res.status(404).send({ error: 'Not Found' })

    return res.send({ job })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Not a valid ID' })
    } else {
      return res.status(500).send({ error: 'Internal Error' })
    }
  }
})

app.post('/add-client', (req, res) => {
  const { body } = req
  const client = new Client(body)

  client.save().then(() => console.log('New client added'))
  res.sendStatus(200)
})

app.get('/clients', (req, res) => {
  const response = Client.find().then(data => res.send(data))
})

app.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)

    if (!client) return res.status(404).send({ error: 'Not Found' })

    return res.send({ client })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Not a valid ID' })
    } else {
      return res.status(500).send({ error: 'Internal Error' })
    }
  }
})

app.post('/sign-up', (req, res) => {
  const { body } = req
  const user = new User(body)

  user.save().then(() => console.log('User created!'))
  res.sendStatus(200)
})

app.get('/users', (req, res) => {
  const response = User.find().then(data => res.send(data))
})

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).send({ error: 'Not Found' })

    return res.send({ user })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Not a valid ID' })
    } else {
      return res.status(500).send({ error: 'Internal Error' })
    }
  }
})

app.put('/update-user/:id', (req, res) => {
  const response = User.update({ _id: req.params.id }, req.body)
    .then(res.sendStatus(200))
    .catch(function(err) {
      throw err // or handle it
    })
})

app.post('/create-job-note', async (req, res) => {
  try {
    const { body } = req
    // rest operator
    const { createdBy, job, ...restOfJobNote } = body
    const foundUser = await User.findOne({ _id: createdBy })
    const foundJob = await Job.findOne({ _id: job })
    const jobNote = new JobNote(restOfJobNote)

    jobNote.createdBy = foundUser._id
    jobNote.job = foundJob._id

    jobNote.save().then(() => {
      console.log('New note added')
      res.sendStatus(200)
    })
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
})

app.get('/get-job-notes', (req, res) => {
  const response = JobNote.find()
    .populate('createdBy')
    .populate('job')
    .then(data => res.send(data))
})

// NOt working
app.get('/get-job-notes/:id', async (req, res) => {
  try {
    const jobNotes = await JobNote.find({ job: req.params.id }).populate(
      'createdBy'
    )

    if (!jobNotes) return res.status(404).send({ error: 'Not Found' })

    return res.send({ jobNotes })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Not a valid ID' })
    } else {
      return res.status(500).send({ error: 'Internal Error' })
    }
  }
})

app.post('/add-job', async (req, res) => {
  try {
    const { body } = req
    // rest operator
    const { client, responsible, ...restOfJob } = body
    const foundClient = await Client.findOne({ _id: client })
    const foundUser = await User.findOne({ _id: responsible })
    const job = new Job(restOfJob)
    job.client = foundClient._id
    job.responsible = foundUser._id
    job.save().then(() => {
      console.log('New job added')
    })
    // .catch(error => console.log(error)) [Mongo error msg?]
    res.sendStatus(200)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
