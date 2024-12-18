import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
    if (memos.length === 0) {
      process.stdout.write("メモが存在しません。\n");
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
      process.stdout.write("Ctrl+C/Dが入力された為処理を終了させました");
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
