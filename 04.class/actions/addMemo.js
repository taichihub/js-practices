import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { ADD_MEMO_LOG_MESSAGES } from "../config/log.js";
import { checkIfEmpty } from "../helpers/memoHelpers.js";

export async function addMemo(database) {
  try {
    const content = await getInputLines(input, output);
    checkIfEmpty(content, ADD_MEMO_LOG_MESSAGES.EMPTY);
    const memoContent = content.join("\n");
    await database.insertMemo(memoContent.trim());
    process.stdout.write(`${ADD_MEMO_LOG_MESSAGES.SUCCESS}`);
  } catch (err) {
    process.stderr.write(`${ADD_MEMO_LOG_MESSAGES.SAVE_ERROR}${err.message}`);
  }
}

function getInputLines(input, output) {
  return new Promise((resolve, reject) => {
    const rl = createInterface({ input, output });
    const contents = [];

    rl.on("line", (line) => contents.push(line));
    rl.on("close", () => resolve(contents));
    rl.on("error", (err) => reject(err));
  });
}
