import { loadDatabase } from "../db_operations.js";

const db = loadDatabase().db;

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブルが作成されました。");

    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["Node.js入門"],
      function () {
        console.log(`行が追加されました。id: ${this.lastID}`);

        db.all("SELECT * FROM books", (_, rows) => {
          rows.forEach((row) => {
            console.log(`${row.id}: ${row.title}`);
          });

          db.run("DROP TABLE books", () => {
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
