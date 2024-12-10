import inquirer from "inquirer";

export async function selectMemo(database, message) {
  try {
    const memos = await database.fetchAllMemos();
    checkIfEmpty(memos, message);

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

export function checkIfEmpty(array, message) {
  if (array.length === 0) {
    process.stdout.write(message);
    process.exit(1);
  }
}
