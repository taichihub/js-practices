// 外部ライブラリ
import inquirer from "inquirer";

// プロジェクト内からのインポート
import { COMMON_LOG_MESSAGES, logMessage, logError } from "../config/log.js";

export async function handleMemoAction(
  app,
  promptMessage,
  query,
  successCallback,
) {
  try {
    const selectedMemoId = await selectMemo(app, promptMessage);

    if (selectedMemoId) {
      const result = await new Promise((resolve, reject) => {
        app.database.get(query, [selectedMemoId], (err, row) => {
          if (err) {
            reject(new Error(`${COMMON_LOG_MESSAGES.ERROR}${err.message}\n`));
          } else {
            resolve(row);
          }
        });
      });

      if (result) {
        successCallback(result, app);
      }
    }
  } catch (error) {
    logError(`${COMMON_LOG_MESSAGES.ERROR}${error.message}\n`);
  }
}

export async function selectMemo(app, message) {
  try {
    const memos = app.memos;
    checkIfEmpty(memos, logMessage);
    const choices = memos.map((memo) => ({
      name: memo.memo.split("\n")[0],
      value: memo.id,
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
