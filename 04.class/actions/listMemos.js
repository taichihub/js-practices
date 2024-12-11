import { LIST_MEMOS_LOG_MESSAGES } from "../config/log.js";

export async function listMemos(database) {
  const memos = await database.fetchAllMemos();
  if (memos.length === 0) {
    process.stdout.write(LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
    process.exit(0);
  }

  process.stdout.write(LIST_MEMOS_LOG_MESSAGES.TITLE);
  memos.forEach((memo) => {
    const firstLine = memo.memo.split("\n")[0];
    process.stdout.write(`・${firstLine}\n`);
  });
}
