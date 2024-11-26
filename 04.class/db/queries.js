export const MEMOS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)`;
export const MEMO_INSERTION = `INSERT INTO memos (memo) VALUES (?)`;
export const ALL_MEMOS_SELECTION = `SELECT id, memo FROM memos`;
export const MEMO_SELECTION_BY_ID = `SELECT * FROM memos WHERE id = ?`;
export const MEMO_DELETION_BY_ID = `DELETE FROM memos WHERE id = ?`;
