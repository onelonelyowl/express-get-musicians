const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.get('/musicians', async (req, res) => {
    res.json(await Musician.findAll())
})
app.get('/musicians/1', async (req, res) => {
    res.json(await Musician.findByPk(1))
})

app.get('/bands', async (req, res) => {
    res.json(await Band.findAll())
})

module.exports = app;