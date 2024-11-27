import { READ_MEMO_LOG_MESSAGES, logMessage, logError } from "../config/log.js";
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
        logMessage(memo.memo);
      } else {
        logMessage(READ_MEMO_LOG_MESSAGES.NOT_FOUND);
      }
    }
  } catch (err) {
    logError(`${READ_MEMO_LOG_MESSAGES.FETCH_ERROR}${err.message}`);
  }
}
