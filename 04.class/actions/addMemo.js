import { stdin as input, stdout as output } from "process";
import { createInterface } from "readline";

export async function addMemo(database) {
  let lines;

  try {
    if (process.stdin.isTTY) {
      console.log(
        "メモの内容を入力してください（保存するにはCtrl+Dを押してください）:",
      );
    }
    lines = await getInputLines(input);
  } catch (err) {
    console.error(`入力中にエラーが発生しました: ${err.message}`);
    process.exit(1);
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
    let lines = [];

    rl.on("SIGINT", () => {
      console.log("Ctrl+Cが入力された為メモの作成を中止しました");
      process.exit(0);
    });

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      lines = lines.join("\n");
      resolve(lines);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}
