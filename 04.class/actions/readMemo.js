import { selectMemo } from "../helpers/memoHelpers.js";

export async function readMemo(database) {
  const selectedMemoId = await selectMemo(
    database,
    "表示するメモを選んでください:",
  );

  const memo = await database.fetchMemoById(selectedMemoId);
  process.stdout.write(memo.content);
}
