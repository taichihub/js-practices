import { run, all, close } from "../db_operations.js";

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
  await close();
  console.log("データベース接続を閉じました。");
}
