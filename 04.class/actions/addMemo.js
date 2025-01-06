import { stdin as input, stdout as output } from "process";
import { createInterface } from "readline";

export async function addMemo(database) {
  if (process.stdin.isTTY) {
    console.log(
      "メモの内容を入力してください（保存するにはCtrl+Dを押してください）:",
    );
  }

  let lines;
  try {
    lines = await getInputLines(input);
  } catch (err) {
    if (err.message === "SIGINT") {
      console.log("Ctrl+Cが入力された為メモの作成を中止しました");
      process.exit(1);
    }
    if (err.code == "ENOMEM") {
      throw err;
    }
  }

  const isBlank = /^\s*$/.test(lines);
  if (isBlank) {
    console.log("メモの内容が空です。");
    return;
  }

  try {
    await database.insert(lines);
    console.log("メモを追加しました。");
  } catch (err) {
    console.error(`メモの保存処理中にエラーが発生しました: "${err.message}`);
    process.exit(1);
  }
}

function getInputLines(input) {
  return new Promise((resolve, reject) => {
    const rl = createInterface({
      input,
      output,
      terminal: input.isTTY ?? false,
    });
    const lines = [];

    rl.on("SIGINT", () => {
      reject(new Error("SIGINT"));
    });

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      resolve(lines.join("\n"));
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}
