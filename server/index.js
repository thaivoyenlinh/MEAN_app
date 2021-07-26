const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 4100
const ConnectDB = require('./config/database')

ConnectDB.Connect();

app.use(morgan('combined'))

app.get('/', (req, res) => res.send('SERVER IS RUNNING!!'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})