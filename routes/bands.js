const express = require('express')
const bands = express.Router()
const { Band } = require('../models/Band')
const { Musician } = require('../models/Musician')

bands.get('/', async (req, res) => {
    res.json(await Band.findAll())
})

bands.get('/musicians', async (req, res) => {
    const allBandsWithMusicians = await Band.findAll({include: Musician})
    res.json(allBandsWithMusicians)
})

bands.get('/:id/musicians', async (req, res) => {
    res.json(await Band.findAll({where: {id: req.params.id}, include: Musician}))
})

module.exports = { bands }