package models

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	ID        string         `gorm:"primaryKey;size:50" json:"id"`
	Title     string         `gorm:"not null;size:100" json:"title"`
	Emoji     string         `gorm:"not null;size:10" json:"emoji"`
	Gradient  string         `gorm:"not null;size:100" json:"gradient"`
	SortOrder int            `gorm:"default:0" json:"sort_order"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Words     []Word         `gorm:"foreignKey:CategoryID" json:"words,omitempty"`
}

func (c *Category) BeforeDelete(tx *gorm.DB) error {
	// Cascade delete words
	tx.Where("category_id = ?", c.ID).Delete(&Word{})
	return nil
}
