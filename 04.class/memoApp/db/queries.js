export const CREATE_TABLE_MEMOS = `CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)`;
export const INSERT_MEMO = `INSERT INTO memos (memo) VALUES (?)`;
export const SELECT_ALL_MEMOS = `SELECT id, memo FROM memos`;
export const SELECT_MEMO_BY_ID = `SELECT * FROM memos WHERE id = ?`;
export const DELETE_MEMO_BY_ID = `DELETE FROM memos WHERE id = ?`;
