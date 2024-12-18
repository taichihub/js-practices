import sqlite3 from "sqlite3";

export class MemoDatabase {
  #database = null;
  #databasePath;

  constructor({ databasePath = "db/memo.db" }) {
    this.#databasePath = databasePath;
  }

  async connect() {
    try {
      this.#database = await this.#openDatabase(this.#databasePath);
    } catch (err) {
      console.error(`データベース接続エラー(openDatabase): ${err.message}`);
      return;
    }

    try {
      await this.#createMemosTable();
    } catch (err) {
      console.error(`データベース接続エラー(createMemosTable): ${err.message}`);
      return;
    }
  }

  async insertMemo(content) {
    return new Promise((resolve, reject) => {
      this.#database.run(
        "INSERT INTO memos (memo) VALUES (?)",
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

  async fetchAllMemos() {
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

  async fetchMemoById(id) {
    return new Promise((resolve, reject) => {
      this.#database.get(
        "SELECT * FROM memos WHERE id = ?",
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
