import { addMemo } from "./addMemo.js";
import { listMemos } from "./listMemos.js";
import { readMemo } from "./readMemo.js";
import { deleteMemo } from "./deleteMemo.js";

class MemoApp {
  constructor(database) {
    this.db = database.getDb();
  }

  addMemo() {
    addMemo(this.db);
  }

  listMemos() {
    listMemos(this.db);
  }

  readMemo() {
    readMemo(this.db);
  }

  deleteMemo() {
    deleteMemo(this.db);
  }
}

export default MemoApp;
