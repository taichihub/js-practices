#!/usr/bin/env node

import { createDatabase, run, all, close } from "../db_operations.js";

let db = await createDatabase(":memory:");
console.log("メモリ内のSQLiteデータベースに接続しました。");

try {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const title = "Node.js入門";
  try {
    const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
      title,
    ]);
    console.log(`行が追加されました。id: ${result.lastID}`);
    await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
  } catch (err) {
    if (
      err instanceof Error &&
      err.code === "SQLITE_CONSTRAINT" &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      console.error(`エラーが発生しました: ${err.message}`);
    } else {
      throw err;
    }
  }

  try {
    await all(db, "SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
  } catch (err) {
    if (
      err instanceof Error &&
      err.code === "SQLITE_ERROR" &&
      err.message.includes("no such table")
    ) {
      console.error(`エラーが発生しました: ${err.message}`);
    } else {
      throw err;
    }
  }

  await run(db, "DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  await close(db);
  console.log("データベース接続を閉じました。");
}
