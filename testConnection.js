const db = require('./db');

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT * FROM Players');
        console.log('Connected! Players in database:');
        console.log(rows);
    } catch (error) {
        console.log('Connection failed:', error.message);
    }
}

testConnection();