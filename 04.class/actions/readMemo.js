import { selectMemo } from "../helpers/memoHelpers.js";

export async function readMemo(database) {
  const memo = await selectMemo(database, "表示するメモを選んでください:");
  if (!memo) {
    console.log("メモが存在しません。");
    return;
  }
  console.log(memo.content);
}
