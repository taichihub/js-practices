// 外部ライブラリ
import sqlite3 from "sqlite3";

// プロジェクト内からのインポート
import { CREATE_MEMOS_TABLE } from "./queries.js";
import { DATABASE_LOG_MESSAGES } from "../config/log.js";
import { DATABASE_PATH } from "../config/settings.js";

export class MemoDatabase {
  constructor() {
    this.db = null;
  }

  async connect() {
    try {
      this.db = await this.#openDatabase(DATABASE_PATH);
      await this.#createMemosTable();
    } catch (err) {
      console.error(
        `${DATABASE_LOG_MESSAGES.CONNECTION_ERROR}${err.message}\n`,
      );
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
      this.db.run(CREATE_MEMOS_TABLE, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  get databaseConnection() {
    return this.db;
  }
}
