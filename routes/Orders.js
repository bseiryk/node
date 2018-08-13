const express = require('express');
// const mainDebuger = require('debug')('todos')

const Order = require('../Schema/OrderShema')
const router = express.Router();

router.get('/', (req, res ) => {
    Order.find()
    .populate('user', 'name')
    .then(orders => res.send(orders) )
    .catch( err => console.log('Error', err.errors))
})

router.post('/', (req, res ) => {
    const order = new Order(req.body);
    order.save()
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    Order.findByIdAndRemove(id)
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

router.put('/:id', (req, res ) => {
    const { id } = req.params;
    Order.findByIdAndUpdate(id, {...req.body}, {new: true})
    .then( (resp) => {
        res.send(resp)
    } )
    .catch( err => console.log('Error', err.errors))
})

module.exports = router;