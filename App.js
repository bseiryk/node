const express = require('express');
const config = require("config")
const app = express();
const todos = require('./routes/todos')
const mainDebuger = require('debug')('main')

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