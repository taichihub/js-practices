#!/usr/bin/env node

import { MemoDatabase } from "./db/memoDatabase.js";
import { addMemo } from "./actions/addMemo.js";
import { listMemos } from "./actions/listMemos.js";
import { readMemo } from "./actions/readMemo.js";
import { deleteMemo } from "./actions/deleteMemo.js";
import { DATABASE_PATH, OPTIONS } from "./config/settings.js";

async function main() {
  const memoDatabase = new MemoDatabase({
    databasePath: DATABASE_PATH,
  });

  await memoDatabase.connect();
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
