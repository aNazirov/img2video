const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const uploadRouter = require('./routers/upload')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use('/video', express.static('uploads/video'))
app.use('/api', uploadRouter)

module.exports = app