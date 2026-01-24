package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/handlers"
)

func SetupRoutes(r *gin.Engine) {
	HealthHandler:= handlers.NewHealthHandler()

	api := r.Group("/api/v1")
	{
		api.GET("/ping", HealthHandler.Ping)
		// TODO: 今後エンドポイントを追加する
	}
}