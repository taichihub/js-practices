import { db } from "../db.js";

db.run(
  `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
  () => {
    process.stdout.write("テーブルが作成されました。\n");

    db.run(
      `INSERT INTO books (title) VALUES (?)`,
      ["Node.js入門"],
      function () {
        process.stdout.write(`行が追加されました。id: ${this.lastID}\n`);

        db.run(
          `INSERT INTO books (title) VALUES (?)`,
          ["Node.js入門"],
          function (err) {
            if (err) {
              process.stderr.write(`エラーが発生しました: ${err.message}\n`);

              db.all("SELECT * FROM books WHERE id = -1", [], (_, rows) => {
                if (rows.length === 0) {
                  process.stderr.write(
                    "エラーが発生しました: レコードが存在しません\n",
                  );
                }

                db.run("DROP TABLE books", () => {
                  process.stdout.write("テーブルが削除されました。\n");

                  db.close(() => {
                    process.stdout.write("データベース接続を閉じました。\n");
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
