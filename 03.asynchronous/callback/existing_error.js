import { db } from "../db.js";

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

              db.all("SELECT * FROM books WHERE id = -1", [], (_, rows) => {
                if (rows.length === 0) {
                  console.error("エラーが発生しました: レコードが存在しません");
                }

                db.run("DROP TABLE books", () => {
                  console.log("テーブルが削除されました。");

                  db.close(() => {
                    console.log("データベース接続を閉じました。");
                  });
                });
              });
            }
          },
        );
      },
    );
  },
);
