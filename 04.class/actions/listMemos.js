import {
  LIST_MEMOS_LOG_MESSAGES,
  logMessage,
  logError,
} from "../config/log.js";

export async function listMemos(database) {
  try {
    const memos = await database.fetchAllMemos();
    if (!memos || memos.length === 0) {
      return logMessage(LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
    }

    logMessage(LIST_MEMOS_LOG_MESSAGES.TITLE);
    memos.forEach((memo) => {
      const firstLine = memo.memo.split("\n")[0];
      logMessage(`・${firstLine}\n`);
    });
  } catch (err) {
    logError(`${LIST_MEMOS_LOG_MESSAGES.FETCH_ERROR}${err.message}`);
  }
}
