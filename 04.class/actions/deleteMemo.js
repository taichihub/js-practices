import {
  DELETE_MEMO_LOG_MESSAGES,
  logMessage,
  logError,
} from "../config/log.js";
import { selectMemo } from "../helpers/memoHelpers.js";

export async function deleteMemo(database) {
  try {
    const selectedMemoId = await selectMemo(
      database,
      DELETE_MEMO_LOG_MESSAGES.PROMPT,
    );

    if (selectedMemoId) {
      const memo = await database.fetchMemoById(selectedMemoId);
      if (!memo) {
        return logMessage(DELETE_MEMO_LOG_MESSAGES.NOT_FOUND);
      }

      await database.deleteMemoById(selectedMemoId);
      logMessage(`${memo.memo}\n${DELETE_MEMO_LOG_MESSAGES.SUCCESS}`);
    }
  } catch (err) {
    logError(`${DELETE_MEMO_LOG_MESSAGES.DELETE_ERROR}${err.message}`);
  }
}
