const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Games');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Games WHERE GameID = ?',
            [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Game not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, genre, releaseDate } = req.body;
    if (!title || !genre || !releaseDate) {
        return res.status(400).json({ success: false, message: 'Title, genre and releaseDate are required' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO Games (Title, Genre, ReleaseDate) VALUES (?, ?, ?)',
            [title, genre, releaseDate]
        );
        res.status(201).json({ success: true, message: 'Game created', gameID: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;