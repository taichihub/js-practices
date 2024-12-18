import { selectMemo } from "../helpers/memoHelpers.js";

export async function deleteMemo(database) {
  const selectedMemoId = await selectMemo(
    database,
    "削除するメモを選んでください:",
  );

  const memo = await database.fetchMemoById(selectedMemoId);
  await database.deleteMemoById(selectedMemoId);
  process.stdout.write(`${memo.content}\nメモを削除しました。\n`);
}
