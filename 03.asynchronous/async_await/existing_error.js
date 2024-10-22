import { loadDatabase } from "../db.js";

const dbInstance = loadDatabase();

try {
  await dbInstance.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルが作成されました。");

  const titles = ["Node.js入門", "Node.js入門"];
  for (const title of titles) {
    const result = await dbInstance.run(
      "INSERT INTO books (title) VALUES (?)",
      [title],
    );
    console.log(`行が追加されました。id: ${result.lastID}`);
  }
} catch (err) {
  console.error(`エラーが発生しました: ${err.message}`);
  try {
    await dbInstance.run("SELECT * FROM nonexistent_table WHERE id = ?", [-1]);
  } catch {
    console.error("エラーが発生しました: レコードが存在しません");
  }
  await dbInstance.run("DROP TABLE books");
  console.log("テーブルが削除されました。");
} finally {
  dbInstance.close();
}
