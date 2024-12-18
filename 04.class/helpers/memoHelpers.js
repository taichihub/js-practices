import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";
import { MEMO_HELPERS_LOG_MESSAGES } from "../config/log.js";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
    if (memos.length === 0) {
      process.stdout.write(MEMO_HELPERS_LOG_MESSAGES.NOT_FOUND);
      process.exit(0);
    }
    ensureNotEmpty(memos, message);

    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedMemo",
        message,
        choices,
      },
    ]);

    return answer.selectedMemo;
  } catch (error) {
    if (error instanceof ExitPromptError) {
      process.stdout.write(MEMO_HELPERS_LOG_MESSAGES.SIGINT_OR_EOF_RECEIVED);
      process.exit(0);
    }
    throw new Error(error);
  }
}

export function ensureNotEmpty(contents, message) {
  const isBlank = contents.every((content) => /^\s*$/.test(content));
  if (isBlank) {
    process.stdout.write(message);
    process.exit(0);
  }
}
