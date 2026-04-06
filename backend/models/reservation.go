package models

import "time"

type Reservation struct {
	Id uint `gorm:"primaryKey"`
	UserName string `gorm:"not null"`
	MenuId uint `gorm:"not null"`
	ScheduledAt string `gorm:"not null"`
	StartAt time.Time `gorm:"not null"`
	DurationMinutes int64 `gorm:"not null"`
	EndAt time.Time `gorm:"not null"`
	Remark string
}