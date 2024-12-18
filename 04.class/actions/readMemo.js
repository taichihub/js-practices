import { selectMemo } from "../helpers/memoHelpers.js";

export async function readMemo(database) {
  let selectedMemoId;
  try {
    selectedMemoId = await selectMemo(
      database,
      "表示するメモを選んでください:",
    );
  } catch (err) {
    return console.log(err.message);
  }

  const memo = await database.fetchMemoById(selectedMemoId);
  if (!memo) return;

  process.stdout.write(memo.content);
}
