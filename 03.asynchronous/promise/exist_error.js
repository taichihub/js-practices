import { run, all, close } from "../db.js";

run(
  `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
)
  .then(() => {
    process.stdout.write("テーブルが作成されました。\n");
    return run(`INSERT INTO books (title) VALUES (?)`, ["Node.js入門"]);
  })
  .then((result) => {
    process.stdout.write(`行が追加されました。id: ${result.lastID}\n`);
    return run(`INSERT INTO books (title) VALUES (?)`, ["Node.js入門"]);
  })
  .then((result) => {
    process.stdout.write(`もう一行が追加されました。id: ${result.lastID}\n`);
    return all(`SELECT id, title FROM books`);
  })
  .then((rows) => {
    rows.forEach((row) => {
      process.stdout.write(`${row.id}: ${row.title}\n`);
    });
    return run(`DROP TABLE books`);
  })
  .then(() => {
    process.stdout.write("テーブルが削除されました。\n");
  })
  .catch((err) => {
    process.stderr.write(`エラーが発生しました: ${err.message}\n`);
  })
  .finally(() => {
    close();
  });
