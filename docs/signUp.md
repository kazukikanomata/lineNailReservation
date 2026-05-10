1. 認証フロー図（BFF構成 + JWT/Session）
   セキュリティを担保するため、ブラウザ側でアクセストークンを保持せず、BFF（Next.js）がHttpOnly Cookieでセッションを管理する構成が一般的です。

- Login Request: クライアント（Next.js）から管理者情報を送信。
- Auth Verification: Next.jsがSupabase Auth（またはGo API）へ問い合わせ、認証。
- Token Issuance: SupabaseからJWTが発行される。
- Secure Cookie Set: Next.js (BFF) がJWTをHttpOnly, Secure, SameSite=LaxなCookieとしてブラウザにセット。
- Proxy Request: 以降、ブラウザからのリクエストには自動的にCookieが乗り、Next.jsがそれを検証（またはGoへ転送）して認可を行う。

次の対応

- Supabase Auth + Next.js Middleware で「ログイン状態によるページ遷移制限」を作ってしまうのが最短です。
- その後、GoのAPIを「有効なJWTがないと401を返す」ように実装していくのがスムーズでしょう。

### テーブル

adminテーブルをつくる

- admin_id
- admin_name

要件

1. adminテーブルに登録する処理→そこから登録する処理

## 気をつけたいところ

- ログイン・認証でlocalStorageは避ける。(XSSで漏れやすいため)
