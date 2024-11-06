import { run, close } from "../db_operations.js";

try {
  await run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const titles = ["Node.js入門", "Node.js入門"];
  for (const title of titles) {
    try {
      const result = await run("INSERT INTO books (title) VALUES (?)", [title]);
      console.log(`行が追加されました。id: ${result.lastID}`);
    } catch (err) {
      throw new Error(err.message);
    }
  }
} catch (err) {
  if (err instanceof Error) {
    console.error(`エラーが発生しました: ${err.message}`);
  }
  try {
    await run("SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
  } catch {
    console.error(`エラーが発生しました: ${err.message}`);
  }
  await run("DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  await close();
  console.log("データベース接続を閉じました。");
}
