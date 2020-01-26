const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const jobs = ['job one','job 2','job 3']

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/jobs', (req, res) => {
  res.send(jobs)
})

app.post('/add-job', (req, res) => {
  jobs.push(req.body)
  res.sendStatus(200)
}

)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))