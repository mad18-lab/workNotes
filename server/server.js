const express = require("express");
const Note = require("./db");
const mongoose = require("mongoose");
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 7878;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

mongoose.connect("mongodb+srv://ADMIN:ABCD1234@cluster0.6n9n5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/', async (req, res) => {
    const { date, entry, completed, priority } = req.body;

    try {
        const note = new Note({ date, entry, completed, priority });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});