const express = require('express');
// const mainDebuger = require('debug')('users')

const User = require('../Schema/UserSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    User.find()
    .then(resp => res.send(resp) )
    .catch( (err) => console.log(err));
})

router.post('/', (req, res ) => {
    const user = new User(req.body);
    user.save()
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log('our errer', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log(err))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( (resp) => {
        console.log(resp);
        res.send(resp)
    } )
    .catch( err => console.log(err))
})

module.exports = router;