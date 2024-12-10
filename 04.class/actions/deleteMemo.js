import { DELETE_MEMO_LOG_MESSAGES } from "../config/log.js";
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
        return process.stdout.write(DELETE_MEMO_LOG_MESSAGES.NOT_FOUND);
      }

      await database.deleteMemoById(selectedMemoId);
      process.stdout.write(`${memo.memo}\n${DELETE_MEMO_LOG_MESSAGES.SUCCESS}`);
    }
  } catch (err) {
    process.stderr.write(
      `${DELETE_MEMO_LOG_MESSAGES.DELETE_ERROR}${err.message}`,
    );
  }
}
