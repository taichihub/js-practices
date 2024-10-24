#!/usr/bin/env node

import { MemoDatabase } from "./memoApp/db/database.js";
import { MemoApp } from "./memoApp/actions/appManager.js";
import { OPTIONS } from "./memoApp/config/settings.js";

const database = new MemoDatabase();
await database.connect();
const memoApp = new MemoApp(database);
const args = process.argv.slice(2);

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
