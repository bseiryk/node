const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    done: { type: Boolean, required: true },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;

