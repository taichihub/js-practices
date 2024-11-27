import sqlite3 from "sqlite3";
import { MEMOS_TABLE_CREATION } from "./queries.js";
import { DATABASE_LOG_MESSAGES } from "../config/log.js";
import { DATABASE_PATH } from "../config/settings.js";
import {
  MEMO_INSERTION,
  ALL_MEMOS_SELECTION,
  MEMO_SELECTION_BY_ID,
  MEMO_DELETION_BY_ID,
} from "./queries.js";

export class MemoDatabase {
  #database;

  constructor() {
    this.#database = null;
  }

  async connect() {
    try {
      this.#database = await this.#openDatabase(DATABASE_PATH);
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
      this.#database.run(MEMOS_TABLE_CREATION, (err) => {
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
      this.#database.run(MEMO_INSERTION, [content], (err) => {
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
      this.#database.all(ALL_MEMOS_SELECTION, (err, rows) => {
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
      this.#database.get(MEMO_SELECTION_BY_ID, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async deleteMemoById(id) {
    return new Promise((resolve, reject) => {
      this.#database.run(MEMO_DELETION_BY_ID, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
