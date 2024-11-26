#!/usr/bin/env node

import { createDatabase, run, all, close } from "../db_operations.js";

let db;

createDatabase()
  .then((resolvedDB) => {
    console.log("メモリ内のSQLiteデータベースに接続しました。");
    db = resolvedDB;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    console.log("テーブルが作成されました。");
    return run(db, "INSERT INTO books (title) VALUES (?)", ["Node.js入門"]);
  })
  .then((result) => {
    console.log(`行が追加されました。id: ${result.lastID}`);
    return all(db, "SELECT * FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.title}`);
    });
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルが削除されました。");
  })
  .finally(() => {
    return close(db);
  })
  .then(() => {
    console.log("データベース接続を閉じました。");
  });
