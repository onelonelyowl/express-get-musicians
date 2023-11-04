const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json())
app.use(express.urlencoded())

app.get('/musicians', async (req, res) => {
    res.json(await Musician.findAll())
})
app.get('/musicians/:id', async (req, res) => {
    res.json(await Musician.findByPk(req.params.id))
})

app.get('/bands', async (req, res) => {
    res.json(await Band.findAll())
})

app.post('/musicians', async (req, res) => {
    await Musician.create(req.body)
    res.send("New Musician created")
})
app.put('/musicians/:id', async (req, res) => {
    const musicianToReplace = await Musician.findByPk(req.params.id)
    musicianToReplace.update(req.body)
    res.send(`Musician #${req.params.id} replaced/updated`)
})
app.delete('/musicians/:id', async (req, res) => {
    const musicianToDelete = await Musician.findByPk(req.params.id)
    musicianToDelete.destroy()
    res.send(`Musician #${req.params.id} deleted`) 
})

module.exports = app;