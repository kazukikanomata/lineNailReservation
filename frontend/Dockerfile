# 開発環境用（Vite dev server）
FROM node:20-alpine

WORKDIR /app

# パッケージファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# Vite dev serverを起動
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]