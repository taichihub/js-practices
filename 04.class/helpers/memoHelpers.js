// 外部ライブラリ
import inquirer from "inquirer";

// プロジェクト内からのインポート
import { SELECT_ALL_MEMOS } from "../db/queries.js";
import {
  COMMON_LOG_MESSAGES,
  MEMO_HELPERS_LOG_MESSAGES,
  logMessage,
  logError,
} from "../config/log.js";

export async function handleMemoAction(
  db,
  promptMessage,
  query,
  successMessage,
) {
  try {
    const selectedMemoId = await selectMemo(db, promptMessage);

    if (selectedMemoId) {
      const result = await new Promise((resolve, reject) => {
        db.get(query, [selectedMemoId], (err, row) => {
          if (err) {
            reject(new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}\n`));
          } else {
            resolve(row);
          }
        });
      });

      if (result) {
        logMessage(successMessage(result));
      }
    }
  } catch (error) {
    logError(`${COMMON_LOG_MESSAGES.ERROR}${error.message}\n`);
  }
}

export async function selectMemo(db, message) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(SELECT_ALL_MEMOS, (err, rows) => {
        if (err) {
          return reject(
            new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}\n`),
          );
        }
        resolve(rows);
      });
    });
    checkIfEmpty(rows, logMessage, MEMO_HELPERS_LOG_MESSAGES.NO_MEMOS);

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

    return answer.selectedMemo;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function checkIfEmpty(array, logMessage, message) {
  if (array.length === 0) {
    logMessage(message);
    process.exit(1);
  }
}
