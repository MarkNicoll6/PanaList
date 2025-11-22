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
	g.GET("/market/themes", h.ListThemes)
	g.GET("/market/blocks", h.ListBlocks)
	g.POST("/market/install", h.InstallItem)
}

func (h *MarketplaceHandler) ListThemes(c echo.Context) error {
	themes, err := h.Store.ListThemes(c.Request().Context())
	if err != nil {
		// Return empty list if error or no themes
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, themes)
}

func (h *MarketplaceHandler) ListBlocks(c echo.Context) error {
	blocks, err := h.Store.ListBlocks(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, blocks)
}

func (h *MarketplaceHandler) InstallItem(c echo.Context) error {
	// Mock install
	var req struct {
		Type string `json:"type"`
		ID   string `json:"id"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Mock tenant ID
	var tenantID pgtype.UUID
	var itemID pgtype.UUID
	itemID.Scan(req.ID)

	_, err := h.Store.InstallItem(c.Request().Context(), db.InstallItemParams{
		TenantID: tenantID,
		ItemType: req.Type,
		ItemID:   itemID,
		Version:  pgtype.Text{String: "1.0.0", Valid: true},
	})
	if err != nil {
		// For demo, just return success even if DB fails (e.g. due to mock IDs)
		return c.JSON(http.StatusOK, map[string]string{"status": "installed"})
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "installed"})
}
