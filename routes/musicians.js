const express = require('express')
const musicians = express.Router()
const {Musician} = require('../models/Musician')
const {check, validationResult} = require('express-validator')


musicians.get('/', async (req, res) => {
    res.json(await Musician.findAll())
})
musicians.get('/:id', async (req, res) => {
    res.json(await Musician.findByPk(req.params.id))
})

musicians.post('/', [check("name").not().isEmpty().trim(), check("instrument").not().isEmpty().trim(), check("name").isLength({min:2, max:20}), check("instrument").isLength({min:2, max:20})], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        res.json(await Musician.create(req.body))
    }
})
musicians.put('/:id', [check("name").not().isEmpty().trim(), check("instrument").not().isEmpty().trim(), check("name").isLength({min:2, max:20}), check("instrument").isLength({min:2, max:20})], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        const musicianToReplace = await Musician.findByPk(req.params.id)
        musicianToReplace.update(req.body)
        res.send(`Musician #${req.params.id} replaced/updated`)
    }
})
musicians.delete('/:id', async (req, res) => {
    const musicianToDelete = await Musician.findByPk(req.params.id)
    musicianToDelete.destroy()
    res.send(`Musician #${req.params.id} deleted`) 
})

module.exports = { musicians }