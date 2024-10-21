import { run, close } from "../db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブルが作成されました。");
    return run("INSERT INTO books (title) VALUES (?)", ["Node.js入門"]);
  })
  .then((result) => {
    console.log(`行が追加されました。id: ${result.lastID}`);
    return run("INSERT INTO books (title) VALUES (?)", ["Node.js入門"]);
  })
  .catch((err) => {
    console.error(`エラーが発生しました: ${err.message}`);
    return run("SELECT * FROM books WHERE id = ?", [-1])
      .catch(() => {
        console.error("エラーが発生しました: レコードが存在しません");
      })
      .then(() => {
        return run("SELECT * FROM books");
      })
      .then(() => {
        console.error("エラーが発生しました: レコードが存在しません");
        return run("DROP TABLE books");
      })
      .then(() => {
        console.log("テーブルが削除されました。");
      });
  })
  .finally(() => {
    close();
  });
