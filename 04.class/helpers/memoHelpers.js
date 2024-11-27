import inquirer from "inquirer";
import { logMessage } from "../config/log.js";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
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
