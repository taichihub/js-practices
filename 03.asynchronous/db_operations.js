import sqlite3 from "sqlite3";

export class Database {
  constructor(driver) {
    this.db = driver;
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export function createSQLiteDatabase() {
  const db = new sqlite3.Database(":memory:", () => {
    console.log("メモリ内のSQLiteデータベースに接続しました。");
  });
  return new Database(db);
}

export function loadDatabase() {
  return createSQLiteDatabase();
}
