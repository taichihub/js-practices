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

  try {
    const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
      "Node.js入門",
    ]);
    console.log(`行が追加されました。id: ${result.lastID}`);
    await run(db, "INSERT INTO books (nonexistent_column) VALUES (?)", [
      "Node.js入門",
    ]);
  } catch (err) {
    const columnError = err.message.match(
      /SQLITE_ERROR: table books has no column named (\w+)/,
    );
    if (columnError) {
      console.error(`エラーが発生しました: ${columnError[0]}`);
    } else {
      throw err;
    }
  }

  try {
    await all(db, "SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
  } catch (err) {
    if (
      String(err).includes("SQLITE_ERROR: no such table: nonexistent_table")
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
