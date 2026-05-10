package main

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/config"
	"github.com/kazukikanomata/backend/database"
	"github.com/kazukikanomata/backend/handlers"
	"github.com/kazukikanomata/backend/internal/jwtauth"
	"github.com/kazukikanomata/backend/routes"
)

func main() {

	cfg := config.Load()

	repo, err := database.NewRepository(cfg)
	if err != nil {
		log.Fatalf("DBの初期化に失敗しました: %v", err)
	}

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		if cfg.CORSAllowedOrigin != "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", cfg.CORSAllowedOrigin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		} else {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		}
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	ttl := time.Duration(cfg.JWTExpiryMinutes) * time.Minute
	authHandler := handlers.NewAuthHandler(repo, []byte(cfg.JWTSecret), cfg.JWTIssuer, cfg.JWTAudience, ttl)
	jwtMw := jwtauth.BearerMiddleware([]byte(cfg.JWTSecret), cfg.JWTIssuer, cfg.JWTAudience)

	routes.SetupRoutes(r, repo, authHandler, jwtMw)

	if err := r.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
