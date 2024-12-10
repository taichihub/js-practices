#!/usr/bin/env node

import { MemoDatabase } from "./db/memoDatabase.js";
import { addMemo } from "./actions/addMemo.js";
import { listMemos } from "./actions/listMemos.js";
import { readMemo } from "./actions/readMemo.js";
import { deleteMemo } from "./actions/deleteMemo.js";
import { DATABASE_PATH, OPTIONS } from "./config/settings.js";
import { DATABASE_LOG_MESSAGES } from "./config/log.js";
import {
  MEMOS_TABLE_CREATION,
  MEMO_INSERTION,
  ALL_MEMOS_SELECTION,
  MEMO_SELECTION_BY_ID,
  MEMO_DELETION_BY_ID,
} from "./db/queries.js";

const queries = {
  MEMOS_TABLE_CREATION,
  MEMO_INSERTION,
  ALL_MEMOS_SELECTION,
  MEMO_SELECTION_BY_ID,
  MEMO_DELETION_BY_ID,
};

async function main() {
  const memoDatabase = new MemoDatabase({
    databasePath: DATABASE_PATH,
    queries: queries,
    logMessages: DATABASE_LOG_MESSAGES,
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
