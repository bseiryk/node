const express = require('express');
const mainDebuger = require('debug')('users')

const User = require('../Schema/UserSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    User.find()
    .then(user => res.send(user) )
    .catch( (err) => mainDebuger.log(err));
})

router.post('/', (req, res ) => {
    const todo = new Todos(req.body);
    todo.save()
    .then( (obj) => mainDebuger(obj) )
    .catch( err => mainDebuger('our errer', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    Todos.findByIdAndRemove(id)
    .then( todo => mainDebuger(todo))
    .catch( err => mainDebuger(err))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    Todos.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( todo => res.send(todo))
    .catch( err => mainDebuger(err))
})

module.exports = router;