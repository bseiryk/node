const express = require('express');
const mainDebuger = require('debug')('main')

const Todos = require('../Schema/TodoSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    Todos.find()
    .then(todos => res.send(todos) )
    .catch( (err) => mainDebuger.log(err));
})

router.post('/', (req, res ) => {
    const todo = new Todos(req.body);
    todo.save()
    .then( (obj) => res.send(obj) )
    .catch( err => mainDebuger(err))
})

router.delete('/', (req, res ) => {
    res.send('something delete');
})

router.put('/', (req, res ) => {
    res.send('something put');
})

module.exports = router;