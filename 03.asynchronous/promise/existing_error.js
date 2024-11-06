import { run, close } from "../db_operations.js";

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
    return run("SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
  })
  .catch((err) => {
    console.error(`エラーが発生しました: ${err.message}`);
    return run("DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルが削除されました。");
  })
  .finally(() => {
    close();
    console.log("データベース接続を閉じました。");
  });
