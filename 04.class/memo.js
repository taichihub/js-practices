#!/usr/bin/env node

import { MemoDatabase } from "./db/database.js";
import { addMemo } from "./actions/addMemo.js";
import { listMemos } from "./actions/listMemos.js";
import { readMemo } from "./actions/readMemo.js";
import { deleteMemo } from "./actions/deleteMemo.js";
import { OPTIONS } from "./config/settings.js";

const DBInstance = new MemoDatabase();
await DBInstance.connect();
const database = DBInstance.databaseConnection;
const args = process.argv.slice(2);

switch (args[0]) {
  case OPTIONS.LIST:
    listMemos(database);
    break;
  case OPTIONS.READ:
    readMemo(database);
    break;
  case OPTIONS.DELETE:
    deleteMemo(database);
    break;
  default:
    addMemo(database);
    break;
}
