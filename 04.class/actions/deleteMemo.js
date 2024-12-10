import { DELETE_MEMO_LOG_MESSAGES } from "../config/log.js";
import { selectMemo } from "../helpers/memoHelpers.js";

export async function deleteMemo(database) {
  const selectedMemoId = await selectMemo(
    database,
    DELETE_MEMO_LOG_MESSAGES.PROMPT,
  );

  const memo = await database.fetchMemoById(selectedMemoId);
  await database.deleteMemoById(selectedMemoId);
  process.stdout.write(`${memo.memo}\n${DELETE_MEMO_LOG_MESSAGES.SUCCESS}`);
}
