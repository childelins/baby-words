package handlers

import (
	"baby-words/database"
	"baby-words/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetPublicCategories retrieves all categories for public learning (no auth required)
func GetPublicCategories(c *gin.Context) {
	var categories []models.Category
	if err := database.DB.Order("sort_order ASC").Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}

	c.JSON(http.StatusOK, categories)
}

// GetPublicWordsByCategory retrieves words for a category for public learning (no auth required)
func GetPublicWordsByCategory(c *gin.Context) {
	id := c.Param("id")

	// First check if category exists
	var category models.Category
	if err := database.DB.First(&category, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	// Get words for this category
	var words []models.Word
	if err := database.DB.Where("category_id = ?", id).Order("sort_order ASC").Find(&words).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch words"})
		return
	}

	c.JSON(http.StatusOK, words)
}

// LogLearningRequest represents the request body for logging learning activity
type LogLearningRequest struct {
	WordID uint   `json:"word_id" binding:"required"`
	Action string `json:"action" binding:"required,oneof=view speak"`
}

// LogLearning logs a learning activity (view or speak)
func LogLearning(c *gin.Context) {
	var req LogLearningRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify word exists
	var word models.Word
	if err := database.DB.First(&word, req.WordID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Word not found"})
		return
	}

	// Create learning log
	log := models.LearningLog{
		WordID: req.WordID,
		Action: req.Action,
	}

	if err := database.DB.Create(&log).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to log learning activity"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Learning activity logged successfully"})
}
