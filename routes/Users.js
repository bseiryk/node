const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash')
// const mainDebuger = require('debug')('users')

const {User, validate} = require('../Schema/UserSchema')
const router = express.Router();

router.get('/', (req, res ) => {
    User.find()
    .then(resp => res.send(resp) )
    .catch( (err) => console.log(err));
})

router.post('/', async (req, res ) => {
    const {error} = validate(req.body);
    if (error) {
        res.statusCode = 404;
        res.send(error.details[0].message)
    }
    let user = await User.findOne({email: req.body.email});
    if(user) res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    user.save()
    .then( (resp) => {
        res.send(_.pick(resp, ['name', 'email']))
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