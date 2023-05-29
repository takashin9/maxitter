const sqlite3 = require('sqlite3').verbose();
const queries = require('./queries');

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(queries.Tweets.createTable);
    db.run(queries.Users.createTable);
});

db.close();