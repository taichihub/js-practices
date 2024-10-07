import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  process.stdout.write("メモリ内のSQLiteデータベースに接続しました。\n");
});

db.run(
  `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
  () => {
    process.stdout.write("テーブルが作成されました。\n");

    db.run(
      `INSERT INTO books (title) VALUES (?)`,
      ["Node.js入門"],
      function () {
        process.stdout.write(`行が追加されました。id: ${this.lastID}\n`);

        db.all(`SELECT id, title FROM books`, [], (err, rows) => {
          rows.forEach((row) => {
            process.stdout.write(`${row.id}: ${row.title}\n`);
          });

          db.run(`DROP TABLE books`, () => {
            process.stdout.write("テーブルが削除されました。\n");

            db.close(() => {
              process.stdout.write("データベース接続を閉じました。\n");
            });
          });
        });
      },
    );
  },
);
