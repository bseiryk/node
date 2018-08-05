const express = require('express');
const config = require("config")
const mongoose = require('mongoose')
const todos = require('./routes/todos')
const mainDebuger = require('debug')('main')


mongoose.connect('mongodb://nevis1:nevis789456123@ds020228.mlab.com:20228/node_learn', {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => console.log('connected to db'))


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(config.get('password'))
})

app.use('/todos', todos)

mainDebuger('main debuger')

app.listen(config.get('Customer.PORT'), () => {
    console.log('WORK');
})