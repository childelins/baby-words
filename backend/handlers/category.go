package handlers

import (
	"baby-words/database"
	"baby-words/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetCategories retrieves all categories
func GetCategories(c *gin.Context) {
	var categories []models.Category
	if err := database.DB.Order("sort_order ASC").Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

// CreateCategoryRequest represents the request body for creating a category
type CreateCategoryRequest struct {
	ID        string `json:"id" binding:"required"`
	Title     string `json:"title" binding:"required"`
	Emoji     string `json:"emoji" binding:"required"`
	Gradient  string `json:"gradient" binding:"required"`
	SortOrder int    `json:"sort_order"`
}

// CreateCategory creates a new category
func CreateCategory(c *gin.Context) {
	var req CreateCategoryRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if category ID already exists
	var existingCategory models.Category
	if err := database.DB.First(&existingCategory, "id = ?", req.ID).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Category ID already exists"})
		return
	}

	category := models.Category{
		ID:        req.ID,
		Title:     req.Title,
		Emoji:     req.Emoji,
		Gradient:  req.Gradient,
		SortOrder: req.SortOrder,
	}

	if err := database.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": category})
}

// UpdateCategoryRequest represents the request body for updating a category
type UpdateCategoryRequest struct {
	Title     *string `json:"title"`
	Emoji     *string `json:"emoji"`
	Gradient  *string `json:"gradient"`
	SortOrder *int    `json:"sort_order"`
}

// UpdateCategory updates an existing category
func UpdateCategory(c *gin.Context) {
	id := c.Param("id")

	var category models.Category
	if err := database.DB.First(&category, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	var req UpdateCategoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields if provided
	if req.Title != nil {
		category.Title = *req.Title
	}
	if req.Emoji != nil {
		category.Emoji = *req.Emoji
	}
	if req.Gradient != nil {
		category.Gradient = *req.Gradient
	}
	if req.SortOrder != nil {
		category.SortOrder = *req.SortOrder
	}

	if err := database.DB.Save(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update category"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}

// DeleteCategory deletes a category (cascade deletes words)
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")

	var category models.Category
	if err := database.DB.First(&category, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	if err := database.DB.Delete(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete category"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}
