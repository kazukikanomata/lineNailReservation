package handlers

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/database"
	"github.com/kazukikanomata/backend/models"
	"gorm.io/gorm"
)

type NailBookingHandler struct {
	repo *database.Repository
}

// 入力されるリクエスト値を定義
type CreateBookingRequest struct {
	UserName    string `json:"user_name" binding:"required"`
	MenuId      uint   `json:"menu_id" binding:"required"`
	ScheduledAt string `json:"scheduled_at" binding:"required"` // 予約日
	StartAt     string `json:"start_at" binding:"required"`     //　時間帯
	Remark      string `json:"remark"`
}

// コンストラクタ
// *で場所を返す。 &でインスタンスしたものを返す
func NewNailBookingHandler(repo *database.Repository) *NailBookingHandler {
	return &NailBookingHandler{repo: repo}
}

// scheduled_atとstart_atをAsia/Tokyoでまとめる

func parseReservationStart(scheduledDate, startTime string) (time.Time, error) {
	loc, err := time.LoadLocation("Asia/Tokyo")

	if err != nil {
		return time.Time{}, err
	}
	combined := strings.TrimSpace(scheduledDate) + " " + strings.TrimSpace(startTime)
	if t, err := time.ParseInLocation("2006-01-02 15:04", combined, loc); err == nil {
		return t, nil
	}
	return time.ParseInLocation("2006-01-02 15:04:05", combined, loc)

}

func (h *NailBookingHandler) Create(c *gin.Context) {
	var req CreateBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	startAt, err := parseReservationStart(req.ScheduledAt, req.StartAt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid scheduled_at or start_at; use YYYY-MM-DD and HH:mm or HH:mm:ss",
		})
		return
	}

	db := h.repo.DB()
	var menu models.Menu
	if err := db.First(&menu, req.MenuId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "menu not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load menu"})
		return
	}

	endAt := startAt.Add(time.Duration(menu.DurationMinutes) * time.Minute)
	reservation := models.Reservation{
		UserName:        req.UserName,
		MenuId:          req.MenuId,
		ScheduledAt:     req.ScheduledAt,
		StartAt:         startAt,
		EndAt:           endAt,
		DurationMinutes: menu.DurationMinutes,
		Remark:          req.Remark,
	}

	if err := db.Create(&reservation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create reservation"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":          reservation.Id,
		"description": "Reserve Success",
	})
}
