// 外部ライブラリ
import sqlite3 from "sqlite3";

// プロジェクト内からのインポート
import { CREATE_TABLE_MEMOS } from "./queries.js";
import { DATABASE_LOG_MESSAGES, handleError } from "../config/log.js";
import { DATABASE_PATH } from "../config/settings.js";

export class Database {
  constructor() {
    this.db = new sqlite3.Database(DATABASE_PATH, (err) => {
      if (handleError(err, DATABASE_LOG_MESSAGES.CONNECTION_ERROR)) return;
      this.setupDatabase();
    });
  }

  setupDatabase() {
    this.db.run(CREATE_TABLE_MEMOS, (err) => {
      if (handleError(err, DATABASE_LOG_MESSAGES.SETUP_ERROR)) return;
    });
  }

  getDb() {
    return this.db;
  }
}
