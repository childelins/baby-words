package handlers

import (
	"baby-words/database"
	"baby-words/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetWordsByCategory retrieves all words for a specific category
func GetWordsByCategory(c *gin.Context) {
	categoryID := c.Param("id")

	var words []models.Word
	if err := database.DB.Where("category_id = ?", categoryID).Order("sort_order ASC").Find(&words).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch words"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": words})
}

// GetAllWords retrieves all words with optional category filtering
func GetAllWords(c *gin.Context) {
	categoryID := c.Query("category_id")

	var words []models.Word
	query := database.DB.Order("sort_order ASC")

	if categoryID != "" {
		query = query.Where("category_id = ?", categoryID)
	}

	if err := query.Find(&words).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch words"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": words})
}

// CreateWord creates a new word
func CreateWord(c *gin.Context) {
	var req struct {
		CategoryID string `json:"category_id" binding:"required"`
		Emoji      string `json:"emoji" binding:"required"`
		CN         string `json:"cn" binding:"required"`
		EN         string `json:"en" binding:"required"`
		SortOrder  int    `json:"sort_order"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify category exists
	var category models.Category
	if err := database.DB.First(&category, "id = ?", req.CategoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	word := models.Word{
		CategoryID: req.CategoryID,
		Emoji:      req.Emoji,
		CN:         req.CN,
		EN:         req.EN,
		SortOrder:  req.SortOrder,
	}

	if err := database.DB.Create(&word).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create word"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": word})
}

// UpdateWord updates an existing word
func UpdateWord(c *gin.Context) {
	id := c.Param("id")

	// Parse ID to uint
	wordID, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid word ID"})
		return
	}

	var word models.Word
	if err := database.DB.First(&word, wordID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Word not found"})
		return
	}

	var req struct {
		CategoryID string `json:"category_id"`
		Emoji      string `json:"emoji"`
		CN         string `json:"cn"`
		EN         string `json:"en"`
		SortOrder  *int   `json:"sort_order"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields if provided
	if req.CategoryID != "" {
		// Verify category exists
		var category models.Category
		if err := database.DB.First(&category, "id = ?", req.CategoryID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
			return
		}
		word.CategoryID = req.CategoryID
	}
	if req.Emoji != "" {
		word.Emoji = req.Emoji
	}
	if req.CN != "" {
		word.CN = req.CN
	}
	if req.EN != "" {
		word.EN = req.EN
	}
	if req.SortOrder != nil {
		word.SortOrder = *req.SortOrder
	}

	if err := database.DB.Save(&word).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update word"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": word})
}

// DeleteWord soft deletes a word
func DeleteWord(c *gin.Context) {
	id := c.Param("id")

	// Parse ID to uint
	wordID, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid word ID"})
		return
	}

	var word models.Word
	if err := database.DB.First(&word, wordID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Word not found"})
		return
	}

	if err := database.DB.Delete(&word).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete word"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Word deleted successfully"})
}
