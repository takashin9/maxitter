const sqlite3 = require('sqlite3').verbose();
const queries = require('./queries');

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(queries.Tweets.createTable);
    db.run(queries.Users.createTable);

    db.run(queries.Users.create, 'りんご太郎', 'apple@example.com', '2022-08-15 00:00:00');
    db.run(queries.Users.create, 'みかん次郎', 'mikan@example.com', '2022-08-15 00:00:01');
    db.run(queries.Users.create, 'ぶどう三郎', 'budo@example.com', '2022-08-15 00:00:02');

    db.run(queries.Tweets.create, 'あけおめ！', 3, '2023-01-01 00:00:00');
    db.run(queries.Tweets.create, '今年もよろしくお願いします！', 2, '2023-01-01 00:00:01');
    db.run(queries.Tweets.create, '今年こそは痩せるぞ！', 1, '2023-01-01 00:00:02');

    db.all(queries.Tweets.findAll, (err, rows) => {
        console.log(rows);
    });

    db.all(queries.Users.findAll, (err, rows) => {
        console.log(rows);
    });

    db.get(queries.Users.findByTweetId, 1, (err, row) => {
        console.log(row);
    });

    db.get(queries.Users.findByTweetId, 4, (err, row) => {
        console.log(row);
    });
});

db.close();