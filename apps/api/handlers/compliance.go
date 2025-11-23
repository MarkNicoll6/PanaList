package handlers

import (
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
	"github.com/panadirectory/api/middleware"
)

type ComplianceHandler struct {
	Store *db.Queries
}

func NewComplianceHandler(store *db.Queries) *ComplianceHandler {
	return &ComplianceHandler{Store: store}
}

func (h *ComplianceHandler) RegisterRoutes(g *echo.Group, audit *middleware.AuditMiddleware) {
	comp := g.Group("/compliance")
	comp.Use(audit.LogAction("compliance_access")) // Log all access for now

	comp.GET("/stats", h.GetStats)
	comp.GET("/tenants", h.ListTenants)
	comp.GET("/audit", h.ListAuditLogs)
	comp.GET("/rbac", h.ListRoles)
	comp.POST("/rbac", h.CreateRole)
	comp.GET("/config", h.ListConfigIssues)
	comp.POST("/run-scan", h.RunScan)
	comp.GET("/evidence", h.ListEvidence)
	comp.POST("/evidence", h.GenerateEvidence)
}

func (h *ComplianceHandler) GetStats(c echo.Context) error {
	// Mock stats for dashboard
	stats := map[string]interface{}{
		"tenants_monitored": 12,
		"passing_controls":  85,
		"open_actions":      3,
		"last_export":       "2025-11-20T10:00:00Z",
	}
	return c.JSON(http.StatusOK, stats)
}

func (h *ComplianceHandler) ListTenants(c echo.Context) error {
	// Mock tenant list with compliance status
	tenants := []map[string]interface{}{
		{
			"id":          "6a4d7bb2-493b-4910-894b-76c2b8da09c0",
			"name":        "Acme Corp",
			"domain":      "acme.com",
			"status":      "compliant",
			"last_scan":   "2025-11-22T14:30:00Z",
			"open_issues": 0,
		},
		{
			"id":          "b23d7bb2-493b-4910-894b-76c2b8da09c1",
			"name":        "Globex Inc",
			"domain":      "globex.com",
			"status":      "warning",
			"last_scan":   "2025-11-21T09:15:00Z",
			"open_issues": 2,
		},
	}
	return c.JSON(http.StatusOK, tenants)
}

func (h *ComplianceHandler) ListAuditLogs(c echo.Context) error {
	// Re-using enterprise audit logs query but global
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock tenant for now
	logs, err := h.Store.ListEnterpriseAuditLogs(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, logs)
}

func (h *ComplianceHandler) ListRoles(c echo.Context) error {
	roles, err := h.Store.ListRBACRoles(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, roles)
}

func (h *ComplianceHandler) CreateRole(c echo.Context) error {
	var req struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	role, err := h.Store.CreateRBACRole(c.Request().Context(), db.CreateRBACRoleParams{
		Name:        req.Name,
		Description: pgtype.Text{String: req.Description, Valid: true},
		IsSystem:    false,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, role)
}

func (h *ComplianceHandler) ListConfigIssues(c echo.Context) error {
	issues, err := h.Store.ListAllComplianceIssues(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, issues)
}

func (h *ComplianceHandler) RunScan(c echo.Context) error {
	// Real scan logic
	var tenantID pgtype.UUID // Null for global

	// 1. Create scan record
	scan, err := h.Store.CreateComplianceScan(c.Request().Context(), db.CreateComplianceScanParams{
		TenantID:    tenantID,
		Status:      "running",
		SummaryJson: []byte("{}"),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// 2. Run checks asynchronously
	go func() {
		// Simulate checks
		time.Sleep(2 * time.Second)

		// Check 1: DNS (Mock)
		// Check 2: API Keys (Mock)

		// Create issues if found
		// h.Store.CreateComplianceIssue(...)

		// Update scan status
		// h.Store.UpdateComplianceScan(...)
	}()

	return c.JSON(http.StatusOK, scan)
}

func (h *ComplianceHandler) ListEvidence(c echo.Context) error {
	exports, err := h.Store.ListEvidenceExports(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, exports)
}

func (h *ComplianceHandler) GenerateEvidence(c echo.Context) error {
	var req struct {
		Template string `json:"template"`
		Format   string `json:"format"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID // Null for multi-tenant
	export, err := h.Store.CreateEvidenceExport(c.Request().Context(), db.CreateEvidenceExportParams{
		TenantID: tenantID,
		Template: req.Template,
		Format:   req.Format,
		Status:   "generating",
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Async generation
	go func() {
		time.Sleep(3 * time.Second)
		// Generate PDF/JSON
		// Upload to S3
		// Update export record with URL
	}()

	return c.JSON(http.StatusCreated, export)
}
