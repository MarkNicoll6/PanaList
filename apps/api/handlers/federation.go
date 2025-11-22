package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type FederationHandler struct {
	Store *db.Queries
}

func NewFederationHandler(store *db.Queries) *FederationHandler {
	return &FederationHandler{Store: store}
}

func (h *FederationHandler) RegisterRoutes(g *echo.Group) {
	fed := g.Group("/federation")
	fed.POST("/optin", h.OptIn)
	fed.GET("/optin", h.GetOptIn)
	fed.POST("/sync", h.Sync)
	fed.GET("/search", h.Search)
	fed.GET("/stats", h.Stats)
}

func (h *FederationHandler) GetOptIn(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	optin, err := h.Store.GetFederationOptIn(c.Request().Context(), tenantID)
	if err != nil {
		// Return default if not found
		return c.JSON(http.StatusOK, map[string]interface{}{
			"enabled":    false,
			"categories": []string{},
			"regions":    []string{},
		})
	}
	return c.JSON(http.StatusOK, optin)
}

func (h *FederationHandler) OptIn(c echo.Context) error {
	var req struct {
		Enabled    bool     `json:"enabled"`
		Categories []string `json:"categories"`
		Regions    []string `json:"regions"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	// Mock JSON conversion for simplicity
	optin, err := h.Store.UpsertFederationOptIn(c.Request().Context(), db.UpsertFederationOptInParams{
		TenantID:       tenantID,
		Enabled:        req.Enabled,
		CategoriesJson: []byte("[]"), // In real app, marshal req.Categories
		RegionsJson:    []byte("[]"), // In real app, marshal req.Regions
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, optin)
}

func (h *FederationHandler) Sync(c echo.Context) error {
	// In a real app, this would trigger a background job to re-index all listings
	// For now, we'll just mock adding one item to the index
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	var listingID pgtype.UUID
	listingID.Scan("00000000-0000-0000-0000-000000000001") // Mock listing ID

	_, err := h.Store.AddToFederationIndex(c.Request().Context(), db.AddToFederationIndexParams{
		TenantID:       tenantID,
		ListingID:      listingID,
		NormalizedJson: []byte(`{"title": "Federated Listing", "description": "Synced from tenant"}`),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "synced"})
}

func (h *FederationHandler) Search(c echo.Context) error {
	query := c.QueryParam("query")

	// Log query for analytics
	h.Store.LogFederationQuery(c.Request().Context(), db.LogFederationQueryParams{
		Query:        query,
		FiltersJson:  []byte("{}"),
		ResultsCount: 5, // Mock count
	})

	results, err := h.Store.SearchFederationIndex(c.Request().Context(), query)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}

	return c.JSON(http.StatusOK, results)
}

func (h *FederationHandler) Stats(c echo.Context) error {
	stats, err := h.Store.GetFederationStats(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, stats)
}
