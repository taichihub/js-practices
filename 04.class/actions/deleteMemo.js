import { selectMemo } from "../helpers/memoHelpers.js";

export async function deleteMemo(database) {
  const memo = await selectMemo(database, "削除するメモを選んでください:");
  if (!memo) return;
  await database.deleteMemoById(memo.id);
  console.log("メモを削除しました。");
}
