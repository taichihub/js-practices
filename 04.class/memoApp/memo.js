import { Database } from "./db/database.js";
import MemoApp from "./actions/appManager.js";
import { OPTIONS } from "./config/settings.js";

const database = new Database();
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
