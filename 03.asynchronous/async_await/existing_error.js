import { run, close } from "../db_operations.js";

try {
  await run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const titles = ["Node.js入門", "Node.js入門"];
  for (const title of titles) {
    const result = await run("INSERT INTO books (title) VALUES (?)", [title]);
    console.log(`行が追加されました。id: ${result.lastID}`);
  }
} catch (err) {
  console.error(`エラーが発生しました: ${err.message}`);
}

try {
  await run("SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
} catch (err) {
  console.error(`エラーが発生しました: ${err.message}`);
} finally {
  await run("DROP TABLE books");
  console.log("テーブルが削除されました。");
  await close();
  console.log("データベース接続を閉じました。");
}
