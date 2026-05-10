package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/database"
	"github.com/kazukikanomata/backend/handlers"
)

func SetupRoutes(r *gin.Engine, repo *database.Repository, auth *handlers.AuthHandler, jwtMw gin.HandlerFunc) {
	HealthHandler := handlers.NewHealthHandler(repo)
	NailBookingHandler := handlers.NewNailBookingHandler(repo)

	api := r.Group("/api/v1")
	{
		api.GET("/ping", HealthHandler.Ping)
		api.POST("/bookings", NailBookingHandler.Create)
		api.POST("/auth/login", auth.Login)

		adminOnly := api.Group("/admin")
		adminOnly.Use(jwtMw)
		adminOnly.GET("/me", auth.Me)
	}
}
