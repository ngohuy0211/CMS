const express = require('express')
const app = express()
const router = express.Router()
const Body_parser = require('body-parser')
require('./Apps/kernal')(app, express, Body_parser)
app.use('/', require('./Router/web'))



module.exports = app