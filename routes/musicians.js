const express = require('express')
const musicians = express.Router()
const {Musician} = require('../models/Musician')


musicians.get('/', async (req, res) => {
    res.json(await Musician.findAll())
})
musicians.get('/:id', async (req, res) => {
    res.json(await Musician.findByPk(req.params.id))
})

musicians.post('/', async (req, res) => {
    res.json(await Musician.create(req.body))
})
musicians.put('/:id', async (req, res) => {
    const musicianToReplace = await Musician.findByPk(req.params.id)
    musicianToReplace.update(req.body)
    res.send(`Musician #${req.params.id} replaced/updated`)
})
musicians.delete('/:id', async (req, res) => {
    const musicianToDelete = await Musician.findByPk(req.params.id)
    musicianToDelete.destroy()
    res.send(`Musician #${req.params.id} deleted`) 
})

module.exports = { musicians }