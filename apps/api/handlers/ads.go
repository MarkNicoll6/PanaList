package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type AdsHandler struct {
	Store *db.Queries
}

func NewAdsHandler(store *db.Queries) *AdsHandler {
	return &AdsHandler{Store: store}
}

func (h *AdsHandler) RegisterRoutes(g *echo.Group) {
	g.GET("/ads/zones", h.ListZones)
	g.POST("/ads/creatives", h.CreateCreative)
}

func (h *AdsHandler) ListZones(c echo.Context) error {
	// Mock tenant ID for now
	var tenantID pgtype.UUID
	// In real app, get from context

	zones, err := h.Store.ListAdZones(c.Request().Context(), tenantID)
	if err != nil {
		// Return empty list if no tenant or error, for demo
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, zones)
}

func (h *AdsHandler) CreateCreative(c echo.Context) error {
	// Placeholder
	return c.JSON(http.StatusCreated, map[string]string{"status": "created"})
}
