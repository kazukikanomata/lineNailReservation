package database

import (
	"errors"

	"github.com/kazukikanomata/backend/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (r *Repository) FindAdminByEmail(email string) (*models.Admin, error) {
	var admin models.Admin
	if err := r.db.Where("email = ?", email).First(&admin).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &admin, nil
}

// BootstrapAdmin はテーブルに1件も管理者がいないときだけ seed する。開発初期用。
func (r *Repository) BootstrapAdmin(email, plainPassword string) error {
	if email == "" || plainPassword == "" {
		return nil
	}

	var count int64
	if err := r.db.Model(&models.Admin{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	admin := models.Admin{
		Email:        email,
		PasswordHash: string(hash),
		Name:         "bootstrap",
	}
	return r.db.Create(&admin).Error
}

func CheckAdminPassword(admin *models.Admin, plainPassword string) bool {
	if admin == nil {
		return false
	}
	return bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(plainPassword)) == nil
}
