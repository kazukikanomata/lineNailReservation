package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/database"
	"github.com/kazukikanomata/backend/handlers"
)

func SetupRoutes(r *gin.Engine, repo *database.Repository) {
	HealthHandler:= handlers.NewHealthHandler(repo)
	NailBookingHandler := handlers.NewNailBookingHandler(repo)

	api := r.Group("/api/v1")
	{
		api.GET("/ping", HealthHandler.Ping)
		// TODO: 今後エンドポイントを追加する
		api.POST("/bookings", NailBookingHandler.Create)

	}
}