package main

import (
	"fmt"
	"log"

	"baby-words/config"
	"baby-words/database"
	"baby-words/handlers"
	"baby-words/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	config.LoadConfig()

	// Set Gin mode
	gin.SetMode(config.AppConfig.GinMode)

	// Initialize database
	database.InitDB()

	// Create Gin router
	r := gin.Default()

	// Setup middleware
	middleware.SetupCORS(r)
	r.Use(middleware.CORS())

	// Public routes
	r.GET("/api/health", handlers.HealthCheck)
	r.POST("/api/auth/login", handlers.Login)

	// API routes with auth middleware
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		// Categories
		api.GET("/categories", handlers.GetCategories)
		api.POST("/categories", handlers.CreateCategory)
		api.PUT("/categories/:id", handlers.UpdateCategory)
		api.DELETE("/categories/:id", handlers.DeleteCategory)

		// Words
		api.GET("/categories/:id/words", handlers.GetWordsByCategory)
		api.GET("/words", handlers.GetAllWords)
		api.POST("/words", handlers.CreateWord)
		api.PUT("/words/:id", handlers.UpdateWord)
		api.DELETE("/words/:id", handlers.DeleteWord)

		// Stats
		api.GET("/stats/dashboard", handlers.GetDashboardStats)
		api.GET("/stats/popular", handlers.GetPopularWords)
		api.GET("/stats/recent", handlers.GetRecentLogs)
	}

	// Public learning endpoints (no auth required, track usage)
	public := r.Group("/api")
	{
		public.GET("/public/categories", handlers.GetPublicCategories)
		public.GET("/public/categories/:id/words", handlers.GetPublicWordsByCategory)
		public.POST("/learning/log", handlers.LogLearning)
	}

	// Start server
	addr := fmt.Sprintf(":%s", config.AppConfig.ServerPort)
	log.Printf("Server starting on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
