import { db } from "../db.js";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    process.stdout.write("テーブルが作成されました。\n");

    db.run(
      `INSERT INTO books (title) VALUES (?)`,
      ["Node.js入門"],
      function () {
        process.stdout.write(`行が追加されました。id: ${this.lastID}\n`);

        db.all(`SELECT * FROM books`, [], (_, rows) => {
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
