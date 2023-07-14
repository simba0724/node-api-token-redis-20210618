require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const bodyParser = require("body-parser");
const formData = require("express-form-data")

require('./helpers/init_redis')

const AuthRoute = require('./Routes/Auth.route')

const app = express()
app.use(morgan('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(formData.parse());

app.get('/', async (req, res, next) => {
  res.send('Hello from express.')
})

app.use('/oauth', AuthRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
