const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:     process.env.DB_PORT || 3306,
});

const sql = `
CREATE TABLE IF NOT EXISTS Players (
    PlayerID     INT AUTO_INCREMENT PRIMARY KEY,
    Name         VARCHAR(100) NOT NULL,
    Email        VARCHAR(150) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role         ENUM('Player', 'Admin') DEFAULT 'Player',
    CreatedAt    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Games (
    GameID      INT AUTO_INCREMENT PRIMARY KEY,
    Title       VARCHAR(150) NOT NULL,
    Genre       VARCHAR(50),
    ReleaseDate DATE
);

CREATE TABLE IF NOT EXISTS Scores (
    ScoreID  INT AUTO_INCREMENT PRIMARY KEY,
    PlayerID INT NOT NULL,
    GameID   INT NOT NULL,
    Points   INT NOT NULL,
    Date     DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (GameID)   REFERENCES Games(GameID)     ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sessions (
    SessionID INT AUTO_INCREMENT PRIMARY KEY,
    PlayerID  INT NOT NULL,
    GameID    INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime   DATETIME,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (GameID)   REFERENCES Games(GameID)     ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Achievements (
    AchievementID INT AUTO_INCREMENT PRIMARY KEY,
    PlayerID      INT NOT NULL,
    Title         VARCHAR(100) NOT NULL,
    DateEarned    DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE
);

INSERT IGNORE INTO Players (Name, Email, PasswordHash, Role) VALUES
('Muhammad Ali', 'muhammad@email.com', SHA2('pass123', 256), 'Admin'),
('Sara Ahmed',   'sara@email.com',     SHA2('sara456', 256), 'Player'),
('James Carter', 'james@email.com',    SHA2('james789', 256), 'Player'),
('Ayesha Khan',  'ayesha@email.com',   SHA2('ayesh321', 256), 'Player'),
('Lucas Mendes', 'lucas@email.com',    SHA2('lucas000', 256), 'Player'),
('Nina Patel',   'nina@email.com',     SHA2('nina111', 256),  'Player'),
('Omar Farooq',  'omar@email.com',     SHA2('omar222', 256),  'Player'),
('Emily Zhang',  'emily@email.com',    SHA2('emily333', 256), 'Player');

INSERT IGNORE INTO Games (Title, Genre, ReleaseDate) VALUES
('Antigravity Run', 'Platformer', '2023-01-15'),
('Space Siege',     'Strategy',   '2022-06-10'),
('Neon Drift',      'Racing',     '2023-03-22'),
('Shadow Realm',    'RPG',        '2021-11-05'),
('Turbo Blitz',     'Arcade',     '2023-07-30');

INSERT IGNORE INTO Scores (PlayerID, GameID, Points, Date) VALUES
(1, 1, 9500,  '2024-01-10 14:22:00'),
(2, 1, 8800,  '2024-01-11 09:15:00'),
(3, 1, 7600,  '2024-01-12 18:45:00'),
(4, 2, 12000, '2024-01-13 11:00:00'),
(5, 2, 11500, '2024-01-14 16:30:00'),
(6, 3, 5400,  '2024-01-15 20:10:00'),
(7, 3, 4900,  '2024-01-16 08:55:00'),
(1, 4, 14200, '2024-01-18 17:20:00'),
(2, 5, 6700,  '2024-01-19 10:05:00'),
(3, 5, 6200,  '2024-01-20 15:50:00');

INSERT IGNORE INTO Achievements (PlayerID, Title, DateEarned) VALUES
(1, 'First Win',       '2024-01-10'),
(1, 'High Scorer',     '2024-01-18'),
(2, 'First Win',       '2024-01-11'),
(3, 'Speed Runner',    '2024-01-12'),
(4, 'Strategist',      '2024-01-13'),
(5, 'Marathon Player', '2024-01-14');
`;

// Run each statement one by one
const statements = sql.split(';').filter(s => s.trim());

async function runSetup() {
    for (const statement of statements) {
        if (statement.trim()) {
            await connection.promise().query(statement);
            console.log('✅ Executed:', statement.trim().substring(0, 50));
        }
    }
    console.log('🎉 Database setup complete!');
    connection.end();
}

runSetup().catch(err => {
    console.error('❌ Error:', err.message);
    connection.end();
});