## Next.js

### App routerとPages Routerの違い

Pages Router

pagesディレクトリ内のファイル名やディレクトリ名がそのままURLパスになります。index.tsxはそのディレクトリのルート（/）を指します。

```plaintext
/pages
  ├── index.tsx          (URL: /)
  ├── about.tsx          (URL: /about)
  └── dashboard
      ├── index.tsx      (URL: /dashboard)
      └── settings.tsx   (URL: /dashboard/settings)
```

App Router
ディレクトリがURLパスを定義し、その中にある**page.tsxという名前のファイル**が実際の画面（Leaf：葉）となります。
デフォルトがサーバーコンポーネントであるため、useRouter（クライアントサイドの挙動）を使う場合は 'use client' 宣言が必要。

Next13からこちらを採用することとなった。

- 爆速であること
- スタイリングがlayout.tsxで共通利用できること
- コンポーネント内で爆速でデータを取得できるようになったこと。

```plaintext
/app
  ├── page.tsx             (URL: /)
  ├── about
  │   └── page.tsx         (URL: /about)
  └── dashboard
      ├── page.tsx         (URL: /dashboard)
      └── settings
          └── page.tsx     (URL: /dashboard/settings)

```

## 使い分け

純粋なページ遷移はLinkコンポーネントがよい

### routingどうする？

ver1.0は4画面で構成される。各種URL

- ホーム画面
  - url: /
- メニュー選択
  - url: /menu
- カレンダー表示
  - url: /calendar
- 入力フォームコンポーネント
  - url: /reserve
