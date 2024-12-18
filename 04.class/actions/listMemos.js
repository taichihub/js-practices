export async function listMemos(database) {
  const memos = await database.fetchAllMemos();
  if (memos.length === 0) {
    process.stdout.write("メモが存在しません。\n");
    process.exit(0);
  }

  process.stdout.write("メモ一覧:\n");
  memos.forEach((memo) => {
    const firstLine = memo.content.split("\n")[0];
    process.stdout.write(`・${firstLine}\n`);
  });
}
