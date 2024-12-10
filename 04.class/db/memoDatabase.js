import sqlite3 from "sqlite3";

export class MemoDatabase {
  #database = null;
  #databasePath;
  #queries;
  #logMessages;

  constructor({ databasePath, queries, logMessages }) {
    this.#databasePath = databasePath;
    this.#queries = queries;
    this.#logMessages = logMessages;
  }

  async connect() {
    try {
      this.#database = await this.#openDatabase(this.#databasePath);
      await this.#createMemosTable();
    } catch (err) {
      console.error(`${this.#logMessages.CONNECTION_ERROR}${err.message}\n`);
    }
  }

  #openDatabase(path) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
  }

  #createMemosTable() {
    return new Promise((resolve, reject) => {
      this.#database.run(this.#queries.MEMOS_TABLE_CREATION, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async insertMemo(content) {
    return new Promise((resolve, reject) => {
      this.#database.run(this.#queries.MEMO_INSERTION, [content], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async fetchAllMemos() {
    return new Promise((resolve, reject) => {
      this.#database.all(this.#queries.ALL_MEMOS_SELECTION, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async fetchMemoById(id) {
    return new Promise((resolve, reject) => {
      this.#database.get(
        this.#queries.MEMO_SELECTION_BY_ID,
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        },
      );
    });
  }

  async deleteMemoById(id) {
    return new Promise((resolve, reject) => {
      this.#database.run(this.#queries.MEMO_DELETION_BY_ID, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
