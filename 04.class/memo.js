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
    if (err.code === "SQLITE_CANTOPEN") {
      console.error(`データベースを開けません: ${err.message}`);
    } else if (err.code === "SQLITE_NOTADB") {
      console.error(`データベースファイルではありません: ${err.message}`);
    } else {
      console.error(`データベースに接続できません: ${err.message}`);
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
      try {
        await addMemo(memoDatabase);
        break;
      } catch (err) {
        if (err.code === "ENOMEM") {
          console.error(`システムのメモリ制限を超鹿しました: ${err.message}`);
          process.exit(1);
        }
      }
  }
}

main();
