import { SELECT_ALL_MEMOS } from "../db/queries.js";
import { checkIfEmpty } from "../helpers/memoHelpers.js";
import {
  LIST_MEMOS_LOG_MESSAGES,
  COMMON_LOG_MESSAGES,
  logMessage,
  logError,
} from "../config/log.js";

export async function listMemos(db) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(SELECT_ALL_MEMOS, [], (err, rows) => {
        if (err) {
          return reject(
            new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}`),
          );
        }
        resolve(rows);
      });
    });

    checkIfEmpty(rows, logMessage, LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
    logMessage(LIST_MEMOS_LOG_MESSAGES.TITLE);
    rows.forEach((row) => {
      logMessage(`・${row.memo.split("\n")[0]}\n`);
    });
  } catch (error) {
    logError(error.message);
  }
}
