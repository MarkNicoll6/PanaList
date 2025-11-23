package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type SEOHandler struct {
	Store *db.Queries
}

func NewSEOHandler(store *db.Queries) *SEOHandler {
	return &SEOHandler{Store: store}
}

func (h *SEOHandler) RegisterRoutes(g *echo.Group) {
	seo := g.Group("/seo")
	seo.GET("/settings", h.GetSettings)
	seo.POST("/settings", h.UpdateSettings)
	seo.GET("/clusters", h.ListClusters)
	seo.POST("/clusters", h.CreateCluster)
	seo.GET("/health", h.GetHealth)
}

func (h *SEOHandler) RegisterPublicRoutes(g *echo.Group) {
	g.GET("/llm/feed", h.GetLLMFeed)
}

func (h *SEOHandler) GetSettings(c echo.Context) error {
	// Mock tenant
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	settings, err := h.Store.GetSEOSettings(c.Request().Context(), tenantID)
	if err != nil {
		// Return defaults if not found
		return c.JSON(http.StatusOK, map[string]interface{}{
			"site_title_pattern":       "{{title}} | {{site_name}}",
			"meta_description_pattern": "{{excerpt}}",
			"robots_directives_json":   map[string]interface{}{"index": true, "follow": true},
		})
	}
	return c.JSON(http.StatusOK, settings)
}

func (h *SEOHandler) UpdateSettings(c echo.Context) error {
	var req struct {
		SiteTitlePattern       string                 `json:"site_title_pattern"`
		MetaDescriptionPattern string                 `json:"meta_description_pattern"`
		CanonicalBaseUrl       string                 `json:"canonical_base_url"`
		RobotsDirectives       map[string]interface{} `json:"robots_directives_json"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Mock tenant
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	// Convert map to bytes for JSONB
	// In real app use json.Marshal
	robotsBytes := []byte("{}")

	settings, err := h.Store.UpsertSEOSettings(c.Request().Context(), db.UpsertSEOSettingsParams{
		TenantID:               tenantID,
		SiteTitlePattern:       pgtype.Text{String: req.SiteTitlePattern, Valid: true},
		MetaDescriptionPattern: pgtype.Text{String: req.MetaDescriptionPattern, Valid: true},
		CanonicalBaseUrl:       pgtype.Text{String: req.CanonicalBaseUrl, Valid: true},
		RobotsDirectivesJson:   robotsBytes, // Simplified
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, settings)
}

func (h *SEOHandler) ListClusters(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	clusters, err := h.Store.ListTopicClusters(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, clusters)
}

func (h *SEOHandler) CreateCluster(c echo.Context) error {
	var req struct {
		Title string `json:"title"`
		Slug  string `json:"slug"`
		Type  string `json:"type"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	cluster, err := h.Store.CreateTopicCluster(c.Request().Context(), db.CreateTopicClusterParams{
		TenantID: tenantID,
		Title:    req.Title,
		Slug:     req.Slug,
		Type:     req.Type,
		Status:   "DRAFT",
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, cluster)
}

func (h *SEOHandler) GetHealth(c echo.Context) error {
	// Mock health data
	return c.JSON(http.StatusOK, map[string]interface{}{
		"score": 85,
		"details": map[string]interface{}{
			"technical": 90,
			"content":   80,
			"links":     85,
		},
	})
}

func (h *SEOHandler) GetLLMFeed(c echo.Context) error {
	// Return a structured JSON feed of public content
	// In a real implementation, this would query listings/posts
	feed := map[string]interface{}{
		"version": "1.0",
		"title":   "PanaList Content Feed",
		"items": []map[string]interface{}{
			{
				"id":         "1",
				"title":      "Top 10 Marketing Tools",
				"content":    "Full article content here...",
				"url":        "https://panalist.com/blog/top-10-tools",
				"updated_at": "2025-11-20T10:00:00Z",
			},
		},
	}
	return c.JSON(http.StatusOK, feed)
}
