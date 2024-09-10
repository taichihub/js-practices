import { DELETE_MEMO_BY_ID } from "../db/queries.js";
import { DELETE_MEMO_LOG_MESSAGES } from "../config/log.js";
import { handleMemoAction } from "./memoHelpers.js";

export async function deleteMemo(db) {
  await handleMemoAction(
    db,
    DELETE_MEMO_LOG_MESSAGES.PROMPT,
    DELETE_MEMO_BY_ID,
    () => DELETE_MEMO_LOG_MESSAGES.SUCCESS,
  );
}
