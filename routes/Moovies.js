const express = require('express');
// const mainDebuger = require('debug')('todos')

const Moovie = require('../Schema/MoovieSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    Moovie.find()
    .populate('genres', 'name -_id')
    .then(moovies => res.send(moovies) )
    .catch( err => console.log('Error', err.errors))
})

router.post('/', (req, res ) => {
    const moovie = new Moovie(req.body);
    moovie.save()
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    Moovie.findByIdAndRemove(id)
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    Moovie.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

module.exports = router;