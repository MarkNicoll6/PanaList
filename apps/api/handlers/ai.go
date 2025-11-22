package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type AIHandler struct {
	Store *db.Queries
}

func NewAIHandler(store *db.Queries) *AIHandler {
	return &AIHandler{Store: store}
}

func (h *AIHandler) RegisterRoutes(g *echo.Group) {
	ai := g.Group("/ai")
	ai.POST("/generate", h.Generate)
}

func (h *AIHandler) Generate(c echo.Context) error {
	var req struct {
		Prompt  string `json:"prompt"`
		Context string `json:"context"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Simulate LLM latency
	time.Sleep(1 * time.Second)

	// Mock response based on prompt
	generatedContent := "<h2>AI Generated Content</h2><p>Here is a draft based on your prompt: <strong>" + req.Prompt + "</strong>.</p><p>This content simulates what an LLM would return. It includes formatted HTML to demonstrate rich text integration.</p><ul><li>Point 1: AI is helpful.</li><li>Point 2: It saves time.</li><li>Point 3: Always review the output.</li></ul>"

	return c.JSON(http.StatusOK, map[string]string{
		"content": generatedContent,
	})
}
