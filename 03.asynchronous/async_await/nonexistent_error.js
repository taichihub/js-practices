import { run, all, close } from "../db.js";

async function manageBooks() {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("テーブルが作成されました。");

    const result = await run("INSERT INTO books (title) VALUES (?)", [
      "Node.js入門",
    ]);
    console.log(`行が追加されました。id: ${result.lastID}`);

    const rows = await all("SELECT * FROM books");
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.title}`);
    });

    await run("DROP TABLE books");
    console.log("テーブルが削除されました。");
  } finally {
    close();
  }
}

manageBooks();
