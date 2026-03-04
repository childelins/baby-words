package models

import (
	"time"

	"gorm.io/gorm"
)

type Word struct {
	ID         uint64         `gorm:"primaryKey;autoIncrement" json:"id"`
	CategoryID string         `gorm:"not null;size:50;index" json:"category_id"`
	Emoji      string         `gorm:"not null;size:10" json:"emoji"`
	CN         string         `gorm:"not null;size:100" json:"cn"`
	EN         string         `gorm:"not null;size:100" json:"en"`
	SortOrder  int            `gorm:"default:0" json:"sort_order"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
	Category   *Category      `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
}
