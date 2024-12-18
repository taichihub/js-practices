import { selectMemo } from "../helpers/memoHelpers.js";

export async function deleteMemo(database) {
  let selectedMemoId;
  try {
    selectedMemoId = await selectMemo(
      database,
      "削除するメモを選んでください:",
    );
  } catch (err) {
    return console.log(err.message);
  }

  const memo = await database.fetchMemoById(selectedMemoId);
  if (!memo) return;

  await database.deleteMemoById(selectedMemoId);
  console.log("メモを削除しました。");
}
