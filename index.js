const sqlite3 = require("sqlite3").verbose();
const queries = require("./queries");
const { serve } = require("@hono/node-server");
const { Hono } = require("hono");

const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run(queries.Tweets.createTable);
    db.run(queries.Users.createTable);

    db.run(queries.Users.create, 'りんご太郎', 'apple@example.com', '2022-08-15 00:00:00');
    db.run(queries.Users.create, 'みかん次郎', 'mikan@example.com', '2022-08-15 00:00:01');
    db.run(queries.Users.create, 'ぶどう三郎', 'budo@example.com', '2022-08-15 00:00:02');

    db.run(queries.Tweets.create, 'あけおめ！', 3, '2023-01-01 00:00:00');
    db.run(queries.Tweets.create, '今年もよろしくお願いします！', 2, '2023-01-01 00:00:01');
    db.run(queries.Tweets.create, '今年こそは痩せるぞ！', 1, '2023-01-01 00:00:02');
});

const HTML = (body) => `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>これはただの文字列です</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    ${body}
</body>
</html>
`;

const app = new Hono();

app.get("/", async (c) => {
    const tweets = await new Promise((resolve) => {
        db.all(queries.Tweets.findAll, (err, rows) => {
            resolve(rows);
        });
    });

    const response = HTML(`
        <h1 class="title">ツイート一覧</h1>
    `);

    return c.html(response);
});

serve(app);

process.stdin.on("data", (data) => {
    if (data.toString().trim() === "q") {
        db.close();
        process.exit();
    }
});
