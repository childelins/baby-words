package handlers

import (
	"baby-words/database"
	"baby-words/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// DashboardStats represents statistics for the dashboard
type DashboardStats struct {
	TotalCategories    int64 `json:"total_categories"`
	TotalWords         int64 `json:"total_words"`
	TodayLearningCount int64 `json:"today_learning_count"`
}

// GetDashboardStats retrieves dashboard statistics
func GetDashboardStats(c *gin.Context) {
	var stats DashboardStats

	// Count total categories
	if err := database.DB.Model(&models.Category{}).Count(&stats.TotalCategories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories count"})
		return
	}

	// Count total words
	if err := database.DB.Model(&models.Word{}).Count(&stats.TotalWords).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch words count"})
		return
	}

	// Count today's learning activities
	today := time.Now().Format("2006-01-02")
	if err := database.DB.Model(&models.LearningLog{}).
		Where("DATE(created_at) = ?", today).
		Count(&stats.TodayLearningCount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch today's learning count"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stats})
}

// PopularWord represents a word with its view/speak count
type PopularWord struct {
	WordID     uint   `json:"word_id"`
	Emoji      string `json:"emoji"`
	CN         string `json:"cn"`
	EN         string `json:"en"`
	CategoryID string `json:"category_id"`
	Count      int64  `json:"count"`
}

// GetPopularWords retrieves most viewed/spoken words
func GetPopularWords(c *gin.Context) {
	// Get limit from query param, default to 10
	limit := 10
	if limitStr := c.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 100 {
			limit = l
		}
	}

	// Get action filter from query param (view, speak, or all)
	action := c.Query("action")

	var results []PopularWord

	query := database.DB.Table("learning_logs").
		Select("learning_logs.word_id, words.emoji, words.cn, words.en, words.category_id, COUNT(*) as count").
		Joins("LEFT JOIN words ON words.id = learning_logs.word_id")

	if action != "" && (action == "view" || action == "speak") {
		query = query.Where("learning_logs.action = ?", action)
	}

	query = query.Group("learning_logs.word_id").
		Order("count DESC").
		Limit(limit)

	if err := query.Find(&results).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch popular words"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": results})
}

// RecentLog represents a recent learning activity
type RecentLog struct {
	ID        uint      `json:"id"`
	WordID    uint      `json:"word_id"`
	Action    string    `json:"action"`
	Emoji     string    `json:"emoji"`
	CN        string    `json:"cn"`
	EN        string    `json:"en"`
	CreatedAt time.Time `json:"created_at"`
}

// GetRecentLogs retrieves recent learning activity
func GetRecentLogs(c *gin.Context) {
	// Get limit from query param, default to 20
	limit := 20
	if limitStr := c.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 100 {
			limit = l
		}
	}

	var logs []RecentLog

	query := database.DB.Table("learning_logs").
		Select("learning_logs.id, learning_logs.word_id, learning_logs.action, learning_logs.created_at, words.emoji, words.cn, words.en").
		Joins("LEFT JOIN words ON words.id = learning_logs.word_id").
		Order("learning_logs.created_at DESC").
		Limit(limit)

	if err := query.Find(&logs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recent logs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": logs})
}
