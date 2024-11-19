#!/usr/bin/env node

import { MemoDatabase } from "./db/database.js";
import { MemoApp } from "./memoApp.js";
import { OPTIONS } from "./config/settings.js";

async function main() {
  const DBInstance = new MemoDatabase();
  await DBInstance.connect();
  const database = DBInstance.databaseConnection;

  const memoApp = new MemoApp(database);
  await memoApp.initializeMemos();
  const args = process.argv.slice(2);

  switch (args[0]) {
    case OPTIONS.LIST:
      memoApp.listMemos();
      break;
    case OPTIONS.READ:
      await memoApp.readMemo();
      break;
    case OPTIONS.DELETE:
      await memoApp.deleteMemo();
      break;
    default:
      await memoApp.addMemo();
      break;
  }
}

main();
