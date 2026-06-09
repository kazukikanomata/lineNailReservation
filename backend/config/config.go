package config

import (
	"log"
	"os"
	"strconv"
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	ServerPort string

	JWTSecret        string
	JWTIssuer        string
	JWTAudience      string
	JWTExpiryMinutes int

	AdminBootstrapEmail    string
	AdminBootstrapPassword string

	// CORSAllowedOrigin が空なら "*"（ブラウザ直叩き＋credentials は不可）。Next のサーバー fetch のみなら十分なことが多い。
	CORSAllowedOrigin string
}

func Load() *Config {
	expMin, err := strconv.Atoi(getEnv("JWT_EXPIRATION_MINUTES", "15"))
	if err != nil || expMin < 1 {
		expMin = 15
	}

	return &Config{
		DBName:                 mustEnv("DB_NAME"),
		DBUser:                 mustEnv("DB_USER"),
		DBPassword:             mustEnv("DB_PASSWORD"),
		DBHost:                 mustEnv("DB_HOST"),
		DBPort:                 getEnv("DB_PORT", "5432"),
		ServerPort:             getEnv("SERVER_PORT", "8080"),
		JWTSecret:              mustEnv("JWT_SECRET"),
		JWTIssuer:              getEnv("JWT_ISSUER", "linereserv-api"),
		JWTAudience:            getEnv("JWT_AUDIENCE", "linereserv-admin"),
		JWTExpiryMinutes:       expMin,
		AdminBootstrapEmail:    getEnv("ADMIN_BOOTSTRAP_EMAIL", ""),
		AdminBootstrapPassword: getEnv("ADMIN_BOOTSTRAP_PASSWORD", ""),
		CORSAllowedOrigin:      getEnv("CORS_ALLOWED_ORIGIN", ""),
	}
}

func mustEnv(key string) string {
	value, ok := os.LookupEnv(key)
	if !ok || value == "" {
		log.Fatalf("Error: 環境変数 %sが設定されていません。", key)
	}
	return value
}

func getEnv(key, defaultValue string) string {
	value, ok := os.LookupEnv(key)
	if !ok || value == "" {
		return defaultValue
	}
	return value
}
