#!/usr/bin/env node

import { MemoDatabase } from "./db/database.js";
import { MemoApp } from "./memoApp.js";
import { OPTIONS } from "./config/settings.js";

async function main() {
  const DBInstance = new MemoDatabase();
  await DBInstance.connect();
  const database = DBInstance.databaseConnection;
  const args = process.argv.slice(2);
  const memoApp = new MemoApp(database);

  switch (args[0]) {
    case OPTIONS.LIST:
      memoApp.listMemos();
      break;
    case OPTIONS.READ:
      memoApp.readMemo();
      break;
    case OPTIONS.DELETE:
      memoApp.deleteMemo();
      break;
    default:
      memoApp.addMemo();
      break;
  }
}

main();
