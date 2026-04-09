package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/config"
	"github.com/kazukikanomata/backend/database"
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
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	routes.SetupRoutes(r, repo)

	
	if err := r.Run(":" + cfg.ServerPort); err !=nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}