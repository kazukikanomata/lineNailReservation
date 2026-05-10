package models

import "time"

type AdminSchedule struct {
	Id          uint
	StartAt     time.Time
	EndAt       time.Time
	IsAvailable bool
}
