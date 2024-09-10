// 外部ライブラリ
import inquirer from "inquirer";

// プロジェクト内からのインポート
import { SELECT_ALL_MEMOS } from "../db/queries.js";
import {
  COMMON_LOG_MESSAGES,
  MEMO_HELPERS_LOG_MESSAGES,
  logMessage,
  handleError,
} from "../config/log.js";

export async function handleMemoAction(
  db,
  promptMessage,
  query,
  successMessage,
) {
  const selectedMemoId = await selectMemo(db, promptMessage);

  if (selectedMemoId) {
    db.get(query, [selectedMemoId], (err, result) => {
      if (handleError(err, COMMON_LOG_MESSAGES.ERROR)) return;
      if (result) {
        logMessage(successMessage(result));
      }
    });
  }
}

export async function selectMemo(db, message) {
  return new Promise((resolve, reject) => {
    db.all(SELECT_ALL_MEMOS, [], async (err, rows) => {
      if (handleError(err, COMMON_LOG_MESSAGES.ERROR)) return reject(err);
      checkIfEmpty(
        rows,
        logMessage,
        MEMO_HELPERS_LOG_MESSAGES.NO_MEMOS,
        resolve,
      );

      const choices = rows.map((row) => ({
        name: row.memo.split("\n")[0],
        value: row.id,
      }));

      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "selectedMemo",
          message: message,
          choices: choices,
        },
      ]);

      resolve(answer.selectedMemo);
    });
  });
}

export function checkIfEmpty(array, logMessage, message, resolve = null) {
  if (array.length === 0) {
    logMessage(message);
    if (resolve) {
      return resolve(null);
    }
    return;
  }
}
