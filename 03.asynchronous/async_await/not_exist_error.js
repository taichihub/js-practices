import { run, all, close } from "../db.js";

async function manageBooks() {
  try {
    await run(
      `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
    );
    console.log("テーブルが作成されました。");

    const result = await run(`INSERT INTO books (title) VALUES (?)`, [
      "Node.js入門",
    ]);
    console.log(`行が追加されました。id: ${result.lastID}`);

    const rows = await all(`SELECT id, title FROM books`);
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.title}`);
    });

    await run(`DROP TABLE books`);
    console.log("テーブルが削除されました。");
  } catch (err) {
    console.error(`エラーが発生しました: ${err.message}`);
  } finally {
    close();
  }
}

manageBooks();
