require('dotenv').config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

const port = process.env.PORT || 7878;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM your_table')
        .then(([rows, fields]) => {
            console.log(rows); // This will be an empty array: []
        })
        .catch(err => {
            console.error('Database query failed:', err);
        });
    } catch (err) {
        res.status(500).send('Database query failed.');
    }
});