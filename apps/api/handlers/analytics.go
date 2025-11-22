package handlers

import (
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type AnalyticsHandler struct {
	Store *db.Queries
}

func NewAnalyticsHandler(store *db.Queries) *AnalyticsHandler {
	return &AnalyticsHandler{Store: store}
}

func (h *AnalyticsHandler) RegisterRoutes(g *echo.Group) {
	g.GET("/analytics/overview", h.GetOverview)
	g.GET("/analytics/listings/top", h.GetTopListings)
	g.POST("/insights/weekly-generate", h.GenerateWeeklyInsight)
}

func (h *AnalyticsHandler) GetOverview(c echo.Context) error {
	// Mock tenant ID and dates
	var tenantID pgtype.UUID
	from := time.Now().AddDate(0, 0, -30)
	to := time.Now()

	metrics, err := h.Store.GetDailyMetrics(c.Request().Context(), db.GetDailyMetricsParams{
		TenantID: tenantID,
		Date:     pgtype.Date{Time: from, Valid: true},
		Date_2:   pgtype.Date{Time: to, Valid: true},
	})
	if err != nil {
		// Return empty for demo
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, metrics)
}

func (h *AnalyticsHandler) GetTopListings(c echo.Context) error {
	// Mock tenant ID
	var tenantID pgtype.UUID

	listings, err := h.Store.GetTopListingsByEvents(c.Request().Context(), db.GetTopListingsByEventsParams{
		TenantID: tenantID,
		Event:    "view",
		Limit:    10,
	})
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, listings)
}

func (h *AnalyticsHandler) GenerateWeeklyInsight(c echo.Context) error {
	// Mock AI generation
	return c.JSON(http.StatusOK, map[string]string{
		"summary": "Traffic is up 15% this week. Top performing category: Coffee Shops.",
		"status":  "generated",
	})
}
