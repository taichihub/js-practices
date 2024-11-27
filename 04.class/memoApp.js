import { readFileSync } from "fs";
import {
  ADD_MEMO_LOG_MESSAGES,
  LIST_MEMOS_LOG_MESSAGES,
  READ_MEMO_LOG_MESSAGES,
  DELETE_MEMO_LOG_MESSAGES,
  COMMON_LOG_MESSAGES,
  logMessage,
  logError,
} from "./config/log.js";
import { checkIfEmpty, selectMemo } from "./helpers/memoHelpers.js";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { FILE_ENCODING } from "./config/settings.js";

export class MemoApp {
  #database;

  constructor(memoDatabase) {
    this.#database = memoDatabase;
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

      rl.on("close", async () => {
        checkIfEmpty(content, logMessage, ADD_MEMO_LOG_MESSAGES.EMPTY);
        const memoContent = content.join("\n");
        await this.saveMemo(memoContent);
      });
    }
  }

  async saveMemo(content) {
    try {
      await this.#database.insertMemo(content.trim());
      logMessage(ADD_MEMO_LOG_MESSAGES.SUCCESS);
    } catch (error) {
      logError(error.message);
    }
  }

  async listMemos() {
    try {
      const memos = await this.#database.fetchAllMemos();
      if (memos.length === 0) {
        return logMessage(LIST_MEMOS_LOG_MESSAGES.NOT_FOUND);
      }
      logMessage(LIST_MEMOS_LOG_MESSAGES.TITLE);
      memos.forEach((memo) => {
        logMessage(`・${memo.memo.split("\n")[0]}\n`);
      });
    } catch (error) {
      logError(error.message);
    }
  }

  async readMemo() {
    try {
      const selectedMemoId = await selectMemo(
        this,
        READ_MEMO_LOG_MESSAGES.PROMPT,
      );
      if (selectedMemoId) {
        try {
          const memo = await this.#database.fetchMemoById(selectedMemoId);
          if (memo) {
            logMessage(memo.memo);
          } else {
            logMessage(READ_MEMO_LOG_MESSAGES.NOT_FOUND);
          }
        } catch (error) {
          logError(error.message);
        }
      }
    } catch (err) {
      logError(`${COMMON_LOG_MESSAGES.ERROR}${err.message}\n`);
    }
  }

  async deleteMemo() {
    const selectedMemoId = await selectMemo(
      this,
      DELETE_MEMO_LOG_MESSAGES.PROMPT,
    );
    if (selectedMemoId) {
      try {
        const memo = await this.#database.fetchMemoById(selectedMemoId);
        await this.#database.deleteMemoById(selectedMemoId);
        logMessage(`${memo.memo}\n${DELETE_MEMO_LOG_MESSAGES.SUCCESS}`);
      } catch (error) {
        logError(error.message);
      }
    }
  }
}
