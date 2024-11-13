import { addMemo } from "./actions/addMemo.js";
import { listMemos } from "./actions/listMemos.js";
import { readMemo } from "./actions/readMemo.js";
import { deleteMemo } from "./actions/deleteMemo.js";

export class MemoApp {
  constructor(database) {
    this.database = database;
  }

  addMemo(content = []) {
    addMemo(this.database, content);
  }

  listMemos() {
    listMemos(this.database);
  }

  readMemo() {
    readMemo(this.database);
  }

  deleteMemo() {
    deleteMemo(this.database);
  }
}
