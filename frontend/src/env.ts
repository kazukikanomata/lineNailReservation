/**
 * サーバー側（Server Actions・Middleware 等）は `SERVER_API_BASE_URL` があればそちらを優先できる。
 * 未設定時は NEXT_PUBLIC_API_BASE_URL にフォールバックする（login / go-server-client を参照）。
 */
interface Env {
  /** Go API の基底 URL（クライアントにも露出するので、必要なら BFF のみ運用すること） */
  readonly API_BASE_URL: string;
}

export const env: Env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
};
