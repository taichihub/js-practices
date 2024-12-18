import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
    if (memos.length === 0) {
      return process.stdout.write("メモが存在しません。\n");
    }
    ensureNotEmpty(memos);

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
      throw new Error("Ctrl+C/Dが入力された為処理を終了させました");
    }
  }
}

export function ensureNotEmpty(contents) {
  const isBlank = contents.every((content) => /^\s*$/.test(content));
  if (isBlank) {
    throw new Error("メモの内容が空です。\n");
  }
}
