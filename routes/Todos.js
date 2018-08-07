const express = require('express');
// const mainDebuger = require('debug')('todos')

const Todos = require('../Schema/TodoSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    Todos.find()
    .populate('creator', 'name -_id')
    .then(todos => res.send(todos) )
    .catch( (err) => console.log(err));
})

router.post('/', (req, res ) => {
    const todo = new Todos(req.body);
    todo.save()
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log('our errer', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    Todos.findByIdAndRemove(id)
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log(err))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    Todos.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log(err))
})

module.exports = router;