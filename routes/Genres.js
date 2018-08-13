const express = require('express');
// const mainDebuger = require('debug')('todos')

const Genre = require('../Schema/GenreSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    Genre.find()
    .then(genres => res.send(genres) )
    .catch( err => console.log('Error', err.errors))
})

router.post('/', (req, res ) => {
    const genre = new Genre(req.body);
    genre.save()
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    Genre.findByIdAndRemove(id)
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    Genre.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

module.exports = router;