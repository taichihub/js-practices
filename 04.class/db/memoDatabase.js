import sqlite3 from "sqlite3";

export class MemoDatabase {
  #database;
  #databasePath;

  constructor({ databasePath = "db/memo.db" }) {
    this.#databasePath = databasePath;
  }

  async connect() {
    try {
      this.#database = await this.#openDatabase(this.#databasePath);
    } catch (err) {
      switch (err.code) {
        case "SQLITE_CANTOPEN":
          console.error(
            `データベースを開けません: (databasePath)${this.#databasePath}, (エラーメッセージ)${err.message}`,
          );
          break;
        case "SQLITE_NOTADB":
          console.error(
            `データベースファイルではありません: (databasePath)${this.#databasePath}, (エラーメッセージ)${err.message}`,
          );
          break;
        default:
          console.error(`データベース接続エラー(openDatabase): ${err.message}`);
      }
      return;
    }

    try {
      await this.#createMemosTable();
    } catch (err) {
      switch (err.code) {
        case "SQLITE_ERROR":
          console.error(`SQLエラー: ${err.message}`);
          break;
        default:
          console.error(
            `データベース接続エラー(createMemosTable): ${err.message}`,
          );
      }
      return;
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
