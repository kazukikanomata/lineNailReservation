package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/database"
)

type HealthHandler struct {}

func NewHealthHandler() *HealthHandler {
	return  &HealthHandler{}

}

func (h *HealthHandler) Ping(c *gin.Context) {
	if err := database.DB.Ping(); err !=nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"message": "pong",
			"db_status": "disconnected",
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
		"db_status": "connected",
	})

}