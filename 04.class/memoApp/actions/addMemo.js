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
  handleError,
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

function saveMemo(db, memoContent) {
  db.run(INSERT_MEMO, [memoContent.trim()], (err) => {
    if (handleError(err, COMMON_LOG_MESSAGES.ERROR)) return;
    logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
  });
}
