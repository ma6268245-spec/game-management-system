require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const playersRoute     = require('./routes/players');
const gamesRoute       = require('./routes/games');
const leaderboardRoute = require('./routes/leaderboard');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/players',     playersRoute);
app.use('/api/games',       gamesRoute);
app.use('/api/leaderboard', leaderboardRoute);

app.get('/', (req, res) => {
    res.json({ message: 'Game Management API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});