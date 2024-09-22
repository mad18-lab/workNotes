const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: { type: String, required: true },
    entry: { type: String, required: true },
    completed: { type: String, required: true },
    priority: { type: String, required: true },
});

const noteModel = mongoose.model('noteModel', noteSchema);

module.exports = noteModel;