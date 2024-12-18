import { READ_MEMO_LOG_MESSAGES } from "../config/log.js";
import { selectMemo } from "../helpers/memoHelpers.js";

export async function readMemo(database) {
  const selectedMemoId = await selectMemo(
    database,
    READ_MEMO_LOG_MESSAGES.PROMPT,
  );

  const memo = await database.fetchMemoById(selectedMemoId);
  process.stdout.write(memo.content);
}
