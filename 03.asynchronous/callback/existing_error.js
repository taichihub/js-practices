import { db } from "../db_operations.js";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブルが作成されました。");

    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["Node.js入門"],
      function () {
        console.log(`行が追加されました。id: ${this.lastID}`);

        db.run(
          "INSERT INTO books (title) VALUES (?)",
          ["Node.js入門"],
          function (err) {
            if (err) {
              console.error(`エラーが発生しました: ${err.message}`);
            }

            db.all("SELECT content FROM books", (err) => {
              if (err) {
                console.error("エラーが発生しました: レコードが存在しません");
              }

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
  },
);
