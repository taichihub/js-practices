import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const dbReady = new Promise((resolve, reject) => {
  db.once("open", () => {
    console.log("メモリ内のSQLiteデータベースに接続しました。");
    resolve();
  });
  db.once("error", (err) => reject(err));
});

export function run(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function all(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
