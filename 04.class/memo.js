#!/usr/bin/env node

import { MemoDatabase } from "./db/memoDatabase.js";
import { DATABASE_PATH, OPTIONS } from "./config/settings.js";
import { listMemos } from "./actions/listMemos.js";
import { readMemo } from "./actions/readMemo.js";
import { deleteMemo } from "./actions/deleteMemo.js";
import { addMemo } from "./actions/addMemo.js";

async function main() {
  const memoDatabase = new MemoDatabase(DATABASE_PATH);

  try {
    await memoDatabase.connect();
  } catch (err) {
    switch (err.code) {
      case "SQLITE_CANTOPEN":
        console.error(`データベースを開けません: ${err.message}`);
        break;
      case "SQLITE_NOTADB":
        console.error(`データベースファイルではありません: ${err.message}`);
        break;
    }
    process.exit(1);
  }

  try {
    await memoDatabase.createTable();
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(`テーブルを作成できません: ${err.message}`);
      process.exit(1);
    }
  }

  const args = process.argv.slice(2);

  switch (args[0]) {
    case OPTIONS.LIST:
      await listMemos(memoDatabase);
      break;
    case OPTIONS.READ:
      await readMemo(memoDatabase);
      break;
    case OPTIONS.DELETE:
      await deleteMemo(memoDatabase);
      break;
    default:
      await addMemo(memoDatabase);
      break;
  }
}

main();
