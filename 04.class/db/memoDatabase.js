import sqlite3 from "sqlite3";

export class MemoDatabase {
  #database;
  #databasePath;

  constructor(databasePath = "db/memo.db") {
    this.#databasePath = databasePath;
  }

  async connect() {
    try {
      this.#database = await this.#openDatabase(this.#databasePath);
    } catch (err) {
      if (err.code === "SQLITE_CANTOPEN" || err.code === "SQLITE_NOTADB") {
        throw err;
      }
    }
  }

  async createTable() {
    try {
      await this.#createMemosTable();
    } catch (err) {
      if (err.code === "SQLITE_ERROR") {
        throw err;
      }
    }
  }

  insertMemo(content) {
    return new Promise((resolve, reject) => {
      this.#database.run(
        "INSERT INTO memos (content) VALUES (?)",
        [content],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  fetchAllMemos() {
    return new Promise((resolve, reject) => {
      this.#database.all(
        "SELECT * FROM memos ORDER BY id DESC",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
    });
  }

  deleteMemoById(id) {
    return new Promise((resolve, reject) => {
      this.#database.run("DELETE FROM memos WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
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
      this.#database.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }
}
