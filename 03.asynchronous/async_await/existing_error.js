import { dbReady, run, all, close } from "../db_operations.js";

let db = await dbReady;
console.log("メモリ内のSQLiteデータベースに接続しました。");

try {
  await run(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
  console.log("テーブルが作成されました。");

  try {
    const titles = ["Node.js入門", "Node.js入門"];
    for (const title of titles) {
      const result = await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
      console.log(`行が追加されました。id: ${result.lastID}`);
    }
  } catch (err) {
    console.error(`エラーが発生しました: ${err.message}`);
  }

  try {
    const result = await all(db, "SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
    console.log(result);
  } catch (err) {
    console.error(`エラーが発生しました: ${err.message}`);
  }

  await run(db, "DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  await close(db);
  console.log("データベース接続を閉じました。");
}
