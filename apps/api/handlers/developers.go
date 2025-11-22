package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type DevelopersHandler struct {
	Store *db.Queries
}

func NewDevelopersHandler(store *db.Queries) *DevelopersHandler {
	return &DevelopersHandler{Store: store}
}

func (h *DevelopersHandler) RegisterRoutes(g *echo.Group) {
	dev := g.Group("/admin")
	dev.GET("/api-keys", h.ListAPIKeys)
	dev.POST("/api-keys", h.CreateAPIKey)
	dev.GET("/webhooks", h.ListWebhooks)
	dev.POST("/webhooks", h.CreateWebhook)

	// Public webhook test endpoint
	g.POST("/webhooks/test", h.TestWebhook)
}

func (h *DevelopersHandler) ListAPIKeys(c echo.Context) error {
	// Mock tenant ID
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	keys, err := h.Store.ListAPIKeys(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, keys)
}

func (h *DevelopersHandler) CreateAPIKey(c echo.Context) error {
	var req struct {
		Name string `json:"name"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Generate random key
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to generate key"})
	}
	apiKey := "pk_" + hex.EncodeToString(bytes)

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	// Store hash (mocking hash with plain text for now for simplicity in demo)
	key, err := h.Store.CreateAPIKey(c.Request().Context(), db.CreateAPIKeyParams{
		TenantID:   tenantID,
		Name:       req.Name,
		Hash:       apiKey, // In production, hash this!
		ScopesJson: []byte("[\"read\", \"write\"]"),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"key":   key,
		"token": apiKey, // Return token only once
	})
}

func (h *DevelopersHandler) ListWebhooks(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	hooks, err := h.Store.ListWebhookEndpoints(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, hooks)
}

func (h *DevelopersHandler) CreateWebhook(c echo.Context) error {
	var req struct {
		Url    string   `json:"url"`
		Events []string `json:"events"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	// Generate secret
	bytes := make([]byte, 24)
	rand.Read(bytes)
	secret := "whsec_" + hex.EncodeToString(bytes)

	hook, err := h.Store.CreateWebhookEndpoint(c.Request().Context(), db.CreateWebhookEndpointParams{
		TenantID:   tenantID,
		Url:        req.Url,
		Secret:     secret,
		EventsJson: []byte("[\"listing.created\", \"listing.updated\"]"), // Mock events
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, hook)
}

func (h *DevelopersHandler) TestWebhook(c echo.Context) error {
	// Mock delivery
	return c.JSON(http.StatusOK, map[string]string{"status": "delivered"})
}
