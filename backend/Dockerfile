# ビルドステージ
FROM golang:1.24-alpine AS builder

WORKDIR /app

# 依存関係をコピーしてダウンロード
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main .

# 実行ステージ
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata
ENV TZ=Asia/Tokyo

WORKDIR /app

# ビルドしたバイナリをコピー
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]