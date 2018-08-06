const express = require('express');
const config = require("config")
const mongoose = require('mongoose')
const todos = require('./routes/todos')
const mainDebuger = require('debug')('main')


mongoose.connect(config.get('Customer.dbConnection'), {
    useNewUrlParser: true
})
.then(() => mainDebuger('db connected'))
.catch( error => mainDebuger(error.message));

mongoose.connection.once('open', () => console.log('connected to db'))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(config.get('password'))
})

app.use('/todos', todos)


app.listen(config.get('Customer.PORT'), () => {
    console.log('WORK');
})