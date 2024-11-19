import { readFileSync } from "fs";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import {
  INSERT_MEMO,
  SELECT_ALL_MEMOS,
  SELECT_MEMO_BY_ID,
  DELETE_MEMO_BY_ID,
} from "./db/queries.js";
import { FILE_ENCODING } from "./config/settings.js";
import {
  ADD_MEMO_LOG_MESSAGES,
  LIST_MEMOS_LOG_MESSAGES,
  READ_MEMO_LOG_MESSAGES,
  DELETE_MEMO_LOG_MESSAGES,
  COMMON_LOG_MESSAGES,
  logMessage,
  logError,
} from "./config/log.js";
import { checkIfEmpty, handleMemoAction } from "./helpers/memoHelpers.js";

export class MemoApp {
  constructor(database) {
    this.database = database;
    this.memos = [];
  }

  async initializeMemos() {
    try {
      const rows = await new Promise((resolve, reject) => {
        this.database.all(SELECT_ALL_MEMOS, (err, rows) => {
          if (err) {
            return reject(
              new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}`),
            );
          }
          resolve(rows);
        });
      });
      this.memos = rows;
    } catch (error) {
      logError(error.message);
    }
  }

  addMemo(content = []) {
    if (!input.isTTY) {
      const inputContent = readFileSync(0, FILE_ENCODING);
      this.saveMemo(inputContent);
    } else {
      const rl = createInterface({ input, output });
      logMessage(ADD_MEMO_LOG_MESSAGES.PROMPT);

      rl.on("line", (line) => {
        content.push(line);
      });

      rl.on("close", () => {
        checkIfEmpty(content, logMessage, ADD_MEMO_LOG_MESSAGES.EMPTY);
        const memoContent = content.join("\n");
        this.saveMemo(memoContent);
      });
    }
  }

  async saveMemo(memoContent) {
    try {
      await new Promise((resolve, reject) => {
        this.database.run(INSERT_MEMO, [memoContent.trim()], (err) => {
          if (err) {
            return reject(
              new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}`),
            );
          }
          resolve();
        });
      });

      this.memos.push({ memo: memoContent.trim() });
      logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
    } catch (error) {
      logError(error.message);
    }
  }

  listMemos() {
    if (this.memos.length === 0) {
      logMessage(LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
      return;
    }
    logMessage(LIST_MEMOS_LOG_MESSAGES.TITLE);
    this.memos.forEach((row) => {
      logMessage(`・${row.memo.split("\n")[0]}\n`);
    });
  }

  async readMemo() {
    await handleMemoAction(
      this,
      READ_MEMO_LOG_MESSAGES.PROMPT,
      SELECT_MEMO_BY_ID,
      (row, app) => {
        logMessage(`\n${row.memo}\n`);
        const memoIndex = app.memos.findIndex((memo) => memo.id === row.id);
        if (memoIndex === -1) {
          app.memos.push(row);
        } else {
          app.memos[memoIndex] = row;
        }
      },
    );
  }

  async deleteMemo() {
    await handleMemoAction(
      this,
      DELETE_MEMO_LOG_MESSAGES.PROMPT,
      DELETE_MEMO_BY_ID,
      (result, app) => {
        app.memos = app.memos.filter((memo) => memo.id !== result.id);
        logMessage(DELETE_MEMO_LOG_MESSAGES.SUCCESS);
      },
    );
  }
}
