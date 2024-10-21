import { run, close } from "../db.js";

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
  .catch((err) => {
    process.stderr.write(`エラーが発生しました: ${err.message}\n`);
    return run(`SELECT * FROM books WHERE id = ?`, [-1])
      .catch(() => {
        process.stderr.write("エラーが発生しました: レコードが存在しません\n");
      })
      .then(() => {
        return run(`SELECT * FROM books`);
      })
      .then(() => {
        process.stderr.write("エラーが発生しました: レコードが存在しません\n");
        return run(`DROP TABLE books`);
      })
      .then(() => {
        process.stdout.write("テーブルが削除されました。\n");
      });
  })
  .finally(() => {
    close();
  });
