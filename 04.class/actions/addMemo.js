import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { ensureNotEmpty } from "../helpers/memoHelpers.js";

export async function addMemo(database) {
  let content;

  try {
    if (process.stdin.isTTY) {
      console.log(
        "メモの内容を入力してください（保存するにはCtrl+Dを押してください）:",
      );
    }
    content = await getInputLines(input, output);
  } catch (err) {
    process.stderr.write(`入力中にエラーが発生しました: ${err.message}`);
    return;
  }

  try {
    ensureNotEmpty(content);
  } catch (err) {
    return process.stdout.write(err.message);
  }

  const memoContent = content.join("\n").trim();

  try {
    await database.insertMemo(memoContent);
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
    const rl = createInterface({ input, output, terminal: true });
    const contents = [];

    rl.on("SIGINT", () => {
      console.log("Ctrl+Cが入力された為メモの作成を中止しました");
      process.exit(0);
    });
    rl.on("line", (line) => contents.push(line));
    rl.on("close", () => resolve(contents));
    rl.on("error", (err) => reject(err));
  });
}
