import { READ_MEMO_LOG_MESSAGES } from "../config/log.js";
import { selectMemo } from "../helpers/memoHelpers.js";

export async function readMemo(database) {
  try {
    const selectedMemoId = await selectMemo(
      database,
      READ_MEMO_LOG_MESSAGES.PROMPT,
    );

    if (selectedMemoId) {
      const memo = await database.fetchMemoById(selectedMemoId);
      if (memo) {
        process.stdout.write(memo.memo);
      } else {
        process.stdout.write(READ_MEMO_LOG_MESSAGES.NOT_FOUND);
      }
    }
  } catch (err) {
    process.stderr.write(`${READ_MEMO_LOG_MESSAGES.FETCH_ERROR}${err.message}`);
  }
}
