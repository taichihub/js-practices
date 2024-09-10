// ログ出力関数（標準出力）
export function logMessage(message) {
  process.stdout.write(message);
}

// ログ出力関数（エラー出力）
export function logError(message) {
  process.stderr.write(message);
}

export function handleError(err, logMessage) {
  if (err) {
    logError(`${logMessage}${err.message}\n`);
    return true;
  }
  return false;
}

// 共通ログメッセージ
export const COMMON_LOG_MESSAGES = {
  ERROR: "エラー: ",
};

// database.js 専用のログメッセージ
export const DATABASE_LOG_MESSAGES = {
  SETUP_ERROR: "テーブル作成中にエラーが発生しました: ",
  CONNECTION_ERROR: "データベース接続エラー: ",
  SUCCESS: "データベースのセットアップが完了しました。\n",
};

// addMemo.js 専用のログメッセージ
export const ADD_MEMO_LOG_MESSAGES = {
  PROMPT:
    "メモの内容を入力してください（終了するにはCtrl + Dを押してください）:\n",
  EMPTY: "メモの内容が空です。保存されませんでした。\n",
  SUCCESS: "メモを追加しました。\n",
};

// listMemos.js 専用のログメッセージ
export const LIST_MEMOS_LOG_MESSAGES = {
  TITLE: "メモ一覧:\n",
  NOT_FOUND: "メモが存在しません。\n",
};

// readMemo.js 専用のログメッセージ
export const READ_MEMO_LOG_MESSAGES = {
  PROMPT: "表示するメモを選んでください:",
  NOT_FOUND: "メモが見つかりません。\n",
};

// deleteMemo.js 専用のログメッセージ
export const DELETE_MEMO_LOG_MESSAGES = {
  PROMPT: "削除するメモを選んでください:",
  SUCCESS: "メモを削除しました。\n",
  NOT_FOUND: "削除するメモが見つかりません。\n",
};

// memoHelpers.js 専用のログメッセージ
export const MEMO_HELPERS_LOG_MESSAGES = {
  NO_MEMOS: "メモが存在しません。\n",
};
