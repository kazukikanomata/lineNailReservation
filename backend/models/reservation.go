package models

import "time"

type Reservation struct {
	Id uint
	UserName string
	UserEmail string
	MenuId uint
	StartAt time.Time
	EndAt time.Time
	CounselingNote string
	Status uint
}