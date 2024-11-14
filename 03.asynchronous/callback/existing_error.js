import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  console.log("メモリ内のSQLiteデータベースに接続しました。");
  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", () => {
    console.log("テーブルが作成されました。");

    db.run("INSERT INTO books (title) VALUES (?)", ["Node.js入門"], function () {
      console.log(`行が追加されました。id: ${this.lastID}`);

      db.run("INSERT INTO books (title) VALUES (?)", ["Node.js入門"], (err) => {
        if (err) {
          console.error(`エラーが発生しました: ${err.message}`);
        }

        db.all("SELECT content FROM books", (err) => {
          if (err) {
            console.error(`エラーが発生しました: ${err.message}`);
          }

          db.run("DROP TABLE books", () => {
            console.log("テーブルが削除されました。");

            db.close(() => {
              console.log("データベース接続を閉じました。");
            });
          });
        });
      });
    });
  });
});
