import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  console.log("メモリ内のSQLiteデータベースに接続しました。");
});

db.run(
  `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
  (err) => {
    if (err) {
      return console.error(
        `テーブル作成時にエラーが発生しました: ${err.message}`,
      );
    }
    console.log("テーブルが作成されました。");

    db.run(
      `INSERT INTO books (title) VALUES (?)`,
      ["Node.js入門"],
      db.run(`INSERT INTO books (title) VALUES (?)`, ["Node.js入門"]),
      function (err) {
        if (err) {
          return console.error(
            `データ挿入時にエラーが発生しました: ${err.message}`,
          );
        }
        console.log(`行が追加されました。id: ${this.lastID}`);

        db.all(`SELECT id, title FROM books`, [], (err, rows) => {
          rows.forEach((row) => {
            console.log(`${row.id}: ${row.title}`);
          });

          db.run(`DROP TABLE books`, () => {
            console.log("テーブルが削除されました。");

            db.close(() => {
              console.log("データベース接続を閉じました。");
            });
          });
        });
      },
    );
  },
);
