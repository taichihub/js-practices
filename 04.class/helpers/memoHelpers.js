import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
    if (memos.length === 0) {
      return console.log("メモが存在しません。");
    }
    ensureNotEmpty(memos);

    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo,
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
  }
}

export function ensureNotEmpty(contents) {
  const isBlank = contents.every((content) => /^\s*$/.test(content));
  if (isBlank) {
    throw new Error("メモの内容が空です。\n");
  }
}
