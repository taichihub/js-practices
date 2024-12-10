import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { ADD_MEMO_LOG_MESSAGES } from "../config/log.js";
import { checkIfEmpty } from "../helpers/memoHelpers.js";

export async function addMemo(database) {
  const rl = createInterface({ input, output });

  if (input.isTTY) {
    process.stdout.write(`${ADD_MEMO_LOG_MESSAGES.PROMPT}`);
  }

  const content = [];
  rl.on("line", (line) => content.push(line));
  rl.on("close", async () => {
    try {
      checkIfEmpty(content, ADD_MEMO_LOG_MESSAGES.EMPTY);
      const memoContent = content.join("\n");
      await database.insertMemo(memoContent.trim());
      process.stdout.write(`${ADD_MEMO_LOG_MESSAGES.SUCCESS}`);
    } catch (err) {
      process.stderr.write(`${ADD_MEMO_LOG_MESSAGES.SAVE_ERROR}${err.message}`);
    }
  });
}
