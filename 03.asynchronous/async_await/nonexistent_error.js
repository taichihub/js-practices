import { dbReady, run, all, close } from "../db_operations.js";

let db = await dbReady;
console.log("メモリ内のSQLiteデータベースに接続しました。");

try {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
    "Node.js入門",
  ]);
  console.log(`行が追加されました。id: ${result.lastID}`);

  const rows = await all(db, "SELECT * FROM books");
  rows.forEach((row) => {
    console.log(`${row.id}: ${row.title}`);
  });

  await run(db, "DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  await close(db);
  console.log("データベース接続を閉じました。");
}
