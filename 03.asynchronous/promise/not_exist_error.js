import { run, all, close } from "./db.js";

run(
  `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
)
  .then(() => {
    console.log("テーブルが作成されました。");
    return run(`INSERT INTO books (title) VALUES (?)`, ["Node.js入門"]);
  })
  .then((result) => {
    console.log(`行が追加されました。id: ${result.lastID}`);
    return all(`SELECT id, title FROM books`);
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.title}`);
    });
    return run(`DROP TABLE books`);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
  })
  .catch((err) => {
    console.error(`エラーが発生しました: ${err.message}`);
  })
  .finally(() => {
    close();
  });
