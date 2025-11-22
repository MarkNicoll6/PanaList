package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type MarketplaceHandler struct {
	Store *db.Queries
}

func NewMarketplaceHandler(store *db.Queries) *MarketplaceHandler {
	return &MarketplaceHandler{Store: store}
}

func (h *MarketplaceHandler) RegisterRoutes(g *echo.Group) {
	market := g.Group("/market")
	market.GET("/themes", h.ListThemes)
	market.GET("/blocks", h.ListBlocks)
	market.POST("/install", h.InstallItem)
}

func (h *MarketplaceHandler) ListThemes(c echo.Context) error {
	// Mock Catalog
	themes := []map[string]interface{}{
		{
			"id":          "theme_modern_dark",
			"name":        "Modern Dark",
			"description": "A sleek, dark-mode first theme for tech directories.",
			"price":       0,
		},
		{
			"id":          "theme_minimal_light",
			"name":        "Minimal Light",
			"description": "Clean and airy design for lifestyle directories.",
			"price":       1900, // $19.00
		},
	}
	return c.JSON(http.StatusOK, themes)
}

func (h *MarketplaceHandler) ListBlocks(c echo.Context) error {
	// Mock Catalog
	blocks := []map[string]interface{}{
		{
			"id":          "block_newsletter",
			"name":        "Newsletter Signup",
			"description": "Capture emails with a high-converting form.",
		},
		{
			"id":          "block_featured_carousel",
			"name":        "Featured Carousel",
			"description": "Showcase top listings in a swipeable carousel.",
		},
	}
	return c.JSON(http.StatusOK, blocks)
}

func (h *MarketplaceHandler) InstallItem(c echo.Context) error {
	var req struct {
		Type       string `json:"type"` // 'theme' or 'block'
		ExternalID string `json:"id"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	install, err := h.Store.InstallMarketplaceItem(c.Request().Context(), db.InstallMarketplaceItemParams{
		TenantID:   tenantID,
		Type:       req.Type,
		ExternalID: req.ExternalID,
		ConfigJson: []byte("{}"),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, install)
}
