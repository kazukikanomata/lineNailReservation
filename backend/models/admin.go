package models

import "time"

// Admin は管理画面ログイン用。パスワードは平文で保持しない。
type Admin struct {
	Id           uint      `json:"admin_id" gorm:"column:id;primaryKey"`
	Email        string    `json:"email" gorm:"uniqueIndex;not null"`
	PasswordHash string    `json:"-" gorm:"column:password_hash;not null"`
	Name         string    `json:"admin_name,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

func (Admin) TableName() string {
	return "admins"
}
