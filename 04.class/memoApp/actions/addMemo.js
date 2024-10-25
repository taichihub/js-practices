// Node.js標準モジュール
import { readFileSync } from "fs";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";

// プロジェクト内からのインポート
import { INSERT_MEMO } from "../db/queries.js";
import { FILE_ENCODING } from "../config/settings.js";
import { checkIfEmpty } from "./memoHelpers.js";
import {
  ADD_MEMO_LOG_MESSAGES,
  COMMON_LOG_MESSAGES,
  logMessage,
  logError,
} from "../config/log.js";

export function addMemo(db) {
  if (!input.isTTY) {
    const inputContent = readFileSync(0, FILE_ENCODING);
    saveMemo(db, inputContent);
  } else {
    const rl = createInterface({ input, output });
    logMessage(ADD_MEMO_LOG_MESSAGES.PROMPT);

    const content = [];
    rl.on("line", (line) => {
      content.push(line);
    });

    rl.on("close", () => {
      checkIfEmpty(content, logMessage, ADD_MEMO_LOG_MESSAGES.EMPTY);
      const memoContent = content.join("\n");
      saveMemo(db, memoContent);
    });
  }
}

export async function saveMemo(db, memoContent) {
  try {
    await new Promise((resolve, reject) => {
      db.run(INSERT_MEMO, [memoContent.trim()], (err) => {
        if (err) {
          return reject(
            new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}`),
          );
        }
        resolve();
      });
    });
    logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
  } catch (error) {
    logError(error.message);
  }
}
