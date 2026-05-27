# 🎮 Game Management System

A full-stack web application for managing players, games, scores, sessions, and achievements. Built with Node.js, Express, and MySQL.

## 🚀 Features
- Player registration and management
- Game catalog with genres and release dates
- Global leaderboard with real-time rankings
- Score tracking across multiple games
- Achievement system for player milestones

## 🛠️ Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL

## 📡 API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/players | Get all players |
| GET | /api/players/:id | Get player by ID |
| POST | /api/players | Add new player |
| DELETE | /api/players/:id | Delete player |
| GET | /api/games | Get all games |
| POST | /api/games | Add new game |
| GET | /api/leaderboard | Global top 10 |
| GET | /api/leaderboard/:gameId | Top 5 per game |
| POST | /api/leaderboard | Submit score |

## ⚙️ How to Run
1. Clone the repository
2. Run `npm install`
3. Configure `db.js` with your MySQL credentials
4. Run `node server.js`
5. Open `index.html` in your browser

## 👨‍💻 Author
Muhammad Awais