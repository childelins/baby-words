package models

import (
	"time"
)

type LearningLog struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	WordID    uint      `gorm:"not null;index:idx_word_id" json:"word_id"`
	Action    string    `gorm:"not null;size:10;index" json:"action"` // 'view' or 'speak'
	IPAddress string    `gorm:"size:50" json:"ip_address,omitempty"`
	UserAgent string    `gorm:"size:500" json:"user_agent,omitempty"`
	CreatedAt time.Time `gorm:"index:idx_created_at" json:"created_at"`
	Word      *Word     `gorm:"foreignKey:WordID" json:"word,omitempty"`
}

type Action string

const (
	ActionView  Action = "view"
	ActionSpeak Action = "speak"
)
