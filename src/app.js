const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const { musicians } = require('../routes/musicians')
const { bands } = require('../routes/bands')

const port = 3000;

app.use(express.json())
app.use(express.urlencoded())
app.use('/musicians', musicians)
app.use('/bands', bands)


module.exports = app;