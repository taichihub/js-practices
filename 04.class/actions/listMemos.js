export async function listMemos(database) {
  const memos = await database.fetchAllMemos();
  if (memos.length === 0) {
    return console.log("メモが存在しません。");
  }

  console.log("メモ一覧:");
  memos.forEach((memo) => {
    const firstLine = memo.content.split("\n")[0];
    console.log(`・${firstLine}`);
  });
}
