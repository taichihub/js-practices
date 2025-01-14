import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";

export async function selectMemo(database, message) {
  const memos = await database.fetchAll();
  if (memos.length === 0) {
    return null;
  }

  const choices = memos.map((memo) => ({
    name: memo.content.split("\n")[0],
    value: memo,
  }));

  try {
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
