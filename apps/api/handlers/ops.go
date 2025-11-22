package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type OpsHandler struct {
	Store *db.Queries
}

func NewOpsHandler(store *db.Queries) *OpsHandler {
	return &OpsHandler{Store: store}
}

func (h *OpsHandler) RegisterRoutes(g *echo.Group) {
	ops := g.Group("/ops")
	ops.POST("/scan", h.RunScan)
	ops.GET("/findings", h.ListFindings)
	ops.POST("/apply-fix", h.ApplyFix)

	trends := g.Group("/trends")
	trends.GET("/top", h.GetTopTrends)
}

func (h *OpsHandler) RunScan(c echo.Context) error {
	// Mock AI Scan
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	var entityID pgtype.UUID
	entityID.Scan("00000000-0000-0000-0000-000000000001")

	// Create a mock finding
	finding, err := h.Store.CreateOpsFinding(c.Request().Context(), db.CreateOpsFindingParams{
		TenantID:    tenantID,
		Type:        "broken_link",
		Entity:      "listing",
		EntityID:    entityID,
		Severity:    "high",
		DetailsJson: []byte(`{"url": "http://broken.com", "suggestion": "Remove or update link"}`),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, finding)
}

func (h *OpsHandler) ListFindings(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	findings, err := h.Store.ListOpsFindings(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, findings)
}

func (h *OpsHandler) ApplyFix(c echo.Context) error {
	var req struct {
		FindingID string `json:"finding_id"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	var findingID pgtype.UUID
	findingID.Scan(req.FindingID)

	if err := h.Store.ResolveOpsFinding(c.Request().Context(), db.ResolveOpsFindingParams{
		ID:       findingID,
		TenantID: tenantID,
	}); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "resolved"})
}

func (h *OpsHandler) GetTopTrends(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	trends, err := h.Store.ListTopTrends(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, trends)
}
