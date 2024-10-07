import { SELECT_MEMO_BY_ID } from "../db/queries.js";
import { READ_MEMO_LOG_MESSAGES } from "../config/log.js";
import { handleMemoAction } from "./memoHelpers.js";

export async function readMemo(db) {
  await handleMemoAction(
    db,
    READ_MEMO_LOG_MESSAGES.PROMPT,
    SELECT_MEMO_BY_ID,
    (row) => `\n${row.memo}\n`,
  );
}
