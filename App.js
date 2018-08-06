const express = require('express');
const config = require("config");
const mongoose = require('mongoose');
const Todos = require('./routes/Todos');
const Users = require('./routes/Users');


mongoose.connect(config.get('Customer.dbConnection'), {
    useNewUrlParser: true
})
.then(() => console.log('db connected'))
.catch( error => console.log(error.message));

mongoose.connection.once('open', () => console.log('connected to db'))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(config.get('password'))
})

app.use('/todos', Todos);
app.use('/users', Users);


app.listen(config.get('Customer.PORT'), () => {
    console.log('WORK');
})