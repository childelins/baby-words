package handlers

import (
	"baby-words/config"
	"baby-words/middleware"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// LoginRequest represents the login request body
type LoginRequest struct {
	Password string `json:"password" binding:"required"`
}

// Login handles admin authentication
func Login(c *gin.Context) {
	var req LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password is required"})
		return
	}

	// Verify password
	if req.Password != config.AppConfig.AdminPassword {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data": gin.H{
			"token": token,
			"type":  "Bearer",
		},
	})
}

// HealthCheck returns the health status of the API
func HealthCheck(c *gin.Context) {
	hostname, _ := os.Hostname()
	c.JSON(http.StatusOK, gin.H{
		"status":   "healthy",
		"service":  "baby-words-api",
		"hostname": hostname,
	})
}
