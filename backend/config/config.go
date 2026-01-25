package config

import (
	"log"
	"os"

	"github.com/go-playground/locales/kea"
)

type Config struct {
	DBHost string
	DBPort string
	DBUser string
	DBPassword string
	DBName string
	ServerPort string
}

func Load() *Config {
	return &Config{
		DBHost: mustEnv("DB_HOST"),	
		DBPort: getEnv("DB_PORT", "5432"),
		DBUser: mustEnv("DB_USER"),
		DBPassword: mustEnv("DB_PASSWORD"),
		DBName: mustEnv("DB_NAME"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
	}
}

func mustEnv(key: string) string {
	value, ok := os.LookupEnv(key)
	if !ok || value == "" {
		log.Fatalf("Error: 環境変数 %sが設定されていません。", key)
	}
	return value
}

func getEnv(key, defaultValue: string) string {
	value, ok := os.LookupEnv(key)
	if !ok || value == "" {
		return defaultValue
	}
	return value
}