import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";

export async function addMemo(database) {
  let contents;

  try {
    if (process.stdin.isTTY) {
      console.log(
        "メモの内容を入力してください（保存するにはCtrl+Dを押してください）:",
      );
    }
    contents = await getInputLines(input, output);
  } catch (err) {
    process.stderr.write(`入力中にエラーが発生しました: ${err.message}`);
    return;
  }

  const isBlank = contents.every((item) => /^\s*$/.test(item));
  if (isBlank) {
    return console.log("メモの内容が空です。");
  }

  try {
    await database.insertMemo(contents.join("\n").trim());
    console.log("メモを追加しました。");
  } catch (err) {
    process.stderr.write(
      `メモの保存処理中にエラーが発生しました: "${err.message}`,
    );
    return;
  }
}

function getInputLines(input, output) {
  return new Promise((resolve, reject) => {
    const rl = createInterface({
      input,
      output,
      terminal: input.isTTY ?? false,
    });
    const lines = [];

    rl.on("SIGINT", () => {
      console.log("Ctrl+Cが入力された為メモの作成を中止しました");
      process.exit(0);
    });

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      resolve(lines);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}
