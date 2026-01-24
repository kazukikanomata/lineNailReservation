# 概要

port:8080 のGinサーバーで起動する

## 使用技術スタック

- GoのGinを活用

## ディレクトリ構成

```ファイル構成.txt

backend/
├── main.go # エントリーポイント（ルーティング設定のみ）
├── handlers/ # HTTPハンドラー（各エンドポイントの処理）
├── routes/ # ルーティング設定
├── models/ # データモデル
├── database/ # DB接続管理
└── config/ # 設定管理
```
