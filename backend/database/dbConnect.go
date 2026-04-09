package database

import (
	"fmt"
	"log"

	"github.com/kazukikanomata/backend/config"
	"github.com/kazukikanomata/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

const seededCount = 0

func NewRepository(cfg *config.Config) (*Repository, error) {

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		cfg.DBHost,
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBName,
		cfg.DBPort,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	repo := &Repository{db: db}

	if err := repo.init(); err != nil {
		return nil, err
	}

	return repo, nil
}

func (r *Repository) init() error {
	if err := r.db.AutoMigrate(
		&models.AdminSchedule{},
		&models.Reservation{},
		&models.Menu{},
	); err != nil {
		return fmt.Errorf("migration failed: %w", err)
	}
	return r.SeedMenu()
}

func (r *Repository) SeedMenu() error {
	var count int64
	if err := r.db.Model(&models.Menu{}).Count(&count).Error; err != nil {
		return err;
	}
	
	if count > seededCount {
        return nil
    }

    if err := r.db.Create(&models.InitialMenus).Error; err != nil {
        return err
    }

    log.Printf("seeded %d menu records", len(models.InitialMenus))
    return nil

}

func (r *Repository) DB() *gorm.DB {
    return r.db
}