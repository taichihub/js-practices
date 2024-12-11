export const COMMON_LOG_MESSAGES = {
  ERROR: "エラー: ",
};

export const DATABASE_LOG_MESSAGES = {
  SETUP_ERROR: "テーブル作成中にエラーが発生しました: ",
  CONNECTION_ERROR: "データベース接続エラー: ",
  SUCCESS: "データベースのセットアップが完了しました。\n",
};

export const ADD_MEMO_LOG_MESSAGES = {
  PROMPT:
    "メモの内容を入力してください（保存するにはCtrl+Dを押してください）:\n",
  EMPTY: "メモの内容が空です。保存されませんでした。\n",
  SUCCESS: "メモを追加しました。\n",
  STDIN_ERROR: "標準入力でエラーが発生しました: ",
  SAVE_ERROR: "メモの保存処理中にエラーが発生しました: ",
  INPUT_ERROR: "入力中にエラーが発生しました: ",
  INSERT_ERROR: "データベースへのインサート処理中にエラーが発生しました: ",
  SIGINT_RECEIVED: "Ctrl+Cが入力された為メモの作成を中止しました\n",
};

export const LIST_MEMOS_LOG_MESSAGES = {
  TITLE: "メモ一覧:\n",
  NOT_FOUND: "メモが存在しません。\n",
  SHOW_ERROR: "メモの表示中にエラーが発生しました: ",
};

export const READ_MEMO_LOG_MESSAGES = {
  PROMPT: "表示するメモを選んでください:",
  NOT_FOUND: "メモが見つかりません。\n",
};

export const DELETE_MEMO_LOG_MESSAGES = {
  PROMPT: "削除するメモを選んでください:",
  SUCCESS: "メモを削除しました。\n",
};

export const MEMO_HELPERS_LOG_MESSAGES = {
  SIGINT_OR_EOF_RECEIVED: "Ctrl+C/Dが入力された為処理を終了させました",
};
