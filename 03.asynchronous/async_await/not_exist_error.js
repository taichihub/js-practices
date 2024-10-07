import { run, all, close } from "../db.js";

async function manageBooks() {
  try {
    await run(
      `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
    );
    process.stdout.write("テーブルが作成されました。\n");

    const result = await run(`INSERT INTO books (title) VALUES (?)`, [
      "Node.js入門",
    ]);
    process.stdout.write(`行が追加されました。id: ${result.lastID}\n`);

    const rows = await all(`SELECT id, title FROM books`);
    rows.forEach((row) => {
      process.stdout.write(`${row.id}: ${row.title}\n`);
    });

    await run(`DROP TABLE books`);
    process.stdout.write("テーブルが削除されました。\n");
  } catch (err) {
    process.stderr.write(`エラーが発生しました: ${err.message}\n`);
  } finally {
    close();
  }
}

manageBooks();
