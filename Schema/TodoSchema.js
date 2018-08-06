const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: String,
    value: String,
    authors: [String],
    done: Boolean
});

const Todo = mongoose.model('TodoModel', TodoSchema);

module.exports = Todo;