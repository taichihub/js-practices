export async function listMemos(database) {
  const memos = await database.fetchAll();
  if (memos.length === 0) {
    console.log("メモが存在しません。");
    return;
  }

  console.log("メモ一覧:");
  memos.forEach((memo) => {
    const firstLine = memo.content.split("\n")[0];
    console.log(`・${firstLine}`);
  });
}
