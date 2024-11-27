import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { ADD_MEMO_LOG_MESSAGES, logMessage, logError } from "../config/log.js";
import { checkIfEmpty } from "../helpers/memoHelpers.js";
import { FILE_ENCODING } from "../config/settings.js";

export async function addMemo(database) {
  if (!input.isTTY) {
    await nonInteractiveInput(database);
  } else {
    await interactiveInput(database);
  }
}

async function nonInteractiveInput(database) {
  try {
    const chunks = [];
    for await (const chunk of input) {
      chunks.push(chunk);
    }
    const data = Buffer.concat(chunks).toString(FILE_ENCODING);
    await database.insertMemo(data.trim());
    logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
  } catch (err) {
    logError(`${ADD_MEMO_LOG_MESSAGES.STDIN_ERROR}${err.message}`);
  }
}

async function interactiveInput(database) {
  const rl = createInterface({ input, output });
  const content = [];

  logMessage(ADD_MEMO_LOG_MESSAGES.PROMPT);

  rl.on("line", (line) => content.push(line));
  rl.on("close", async () => {
    try {
      checkIfEmpty(content, logMessage, ADD_MEMO_LOG_MESSAGES.EMPTY);
      const memoContent = content.join("\n");
      await database.insertMemo(memoContent.trim());
      logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
    } catch (err) {
      logError(`${ADD_MEMO_LOG_MESSAGES.SAVE_ERROR}${err.message}`);
    }
  });
}
