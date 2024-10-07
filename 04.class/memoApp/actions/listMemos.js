import { SELECT_ALL_MEMOS } from "../db/queries.js";
import { checkIfEmpty } from "./memoHelpers.js";
import {
  LIST_MEMOS_LOG_MESSAGES,
  COMMON_LOG_MESSAGES,
  logMessage,
  handleError,
} from "../config/log.js";

export function listMemos(db) {
  db.all(SELECT_ALL_MEMOS, [], (err, rows) => {
    if (handleError(err, COMMON_LOG_MESSAGES.ERROR)) return;
    checkIfEmpty(rows, logMessage, LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
    logMessage(LIST_MEMOS_LOG_MESSAGES.TITLE);
    rows.forEach((row) => {
      logMessage(`・${row.memo.split("\n")[0]}\n`);
    });
  });
}
