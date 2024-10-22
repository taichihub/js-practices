import { loadDatabase } from "../db.js";

const dbInstance = loadDatabase();

try {
  await dbInstance.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const result = await dbInstance.run("INSERT INTO books (title) VALUES (?)", [
    "Node.js入門",
  ]);
  console.log(`行が追加されました。id: ${result.lastID}`);

  const rows = await dbInstance.all("SELECT * FROM books");
  rows.forEach((row) => {
    console.log(`${row.id}: ${row.title}`);
  });

  await dbInstance.run("DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  dbInstance.close();
  console.log("データベース接続を閉じました。");
}
