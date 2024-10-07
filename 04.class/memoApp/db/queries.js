// メモのテーブルを作成するクエリ
export const CREATE_TABLE_MEMOS = `
  CREATE TABLE IF NOT EXISTS memos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memo TEXT
  )
`;

// メモを作成するクエリ
export const INSERT_MEMO = `
  INSERT INTO memos (memo) VALUES (?)
`;

// メモを全て取得するクエリ
export const SELECT_ALL_MEMOS = `
  SELECT id, memo FROM memos
`;

// メモをIDで取得するクエリ
export const SELECT_MEMO_BY_ID = `
  SELECT * FROM memos WHERE id = ?
`;

// メモをIDで削除するクエリ
export const DELETE_MEMO_BY_ID = `
  DELETE FROM memos WHERE id = ?
`;
