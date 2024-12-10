import { LIST_MEMOS_LOG_MESSAGES } from "../config/log.js";

export async function listMemos(database) {
  try {
    const memos = await database.fetchAllMemos();
    if (!memos || memos.length === 0) {
      return process.stdout.write(LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
    }

    process.stdout.write(LIST_MEMOS_LOG_MESSAGES.TITLE);
    memos.forEach((memo) => {
      const firstLine = memo.memo.split("\n")[0];
      process.stdout.write(`・${firstLine}\n`);
    });
  } catch (err) {
    process.stderr.write(
      `${LIST_MEMOS_LOG_MESSAGES.FETCH_ERROR}${err.message}`,
    );
  }
}
