import { loadDatabase } from "../db.js";

const dbInstance = loadDatabase();

dbInstance
  .run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
  .then(() => {
    console.log("テーブルが作成されました。");
    return dbInstance.run("INSERT INTO books (title) VALUES (?)", [
      "Node.js入門",
    ]);
  })
  .then((result) => {
    console.log(`行が追加されました。id: ${result.lastID}`);
    return dbInstance.all("SELECT * FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.title}`);
    });
    return dbInstance.run("DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルが削除されました。");
  })
  .finally(() => {
    dbInstance.close();
    console.log("データベース接続を閉じました。");
  });
