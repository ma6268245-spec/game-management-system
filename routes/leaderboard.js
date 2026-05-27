const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.Name, g.Title AS Game, s.Points, s.Date
            FROM Scores s
            JOIN Players p ON s.PlayerID = p.PlayerID
            JOIN Games g   ON s.GameID   = g.GameID
            ORDER BY s.Points DESC
            LIMIT 10
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:gameId', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.Name, s.Points, s.Date
            FROM Scores s
            JOIN Players p ON s.PlayerID = p.PlayerID
            WHERE s.GameID = ?
            ORDER BY s.Points DESC
            LIMIT 5
        `, [req.params.gameId]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No scores found for this game' });
        }
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { playerID, gameID, points } = req.body;
    if (!playerID || !gameID || !points) {
        return res.status(400).json({ success: false, message: 'playerID, gameID and points are required' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO Scores (PlayerID, GameID, Points) VALUES (?, ?, ?)',
            [playerID, gameID, points]
        );
        res.status(201).json({ success: true, message: 'Score submitted', scoreID: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;