package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type EnterpriseHandler struct {
	Store *db.Queries
}

func NewEnterpriseHandler(store *db.Queries) *EnterpriseHandler {
	return &EnterpriseHandler{Store: store}
}

func (h *EnterpriseHandler) RegisterRoutes(g *echo.Group) {
	ent := g.Group("/enterprise")
	ent.GET("/sso", h.GetSSO)
	ent.POST("/sso", h.ConfigureSSO)
	ent.GET("/scim", h.GetSCIM)
	ent.POST("/scim", h.GenerateSCIM)
	ent.GET("/audit", h.ListAuditLogs)
}

func (h *EnterpriseHandler) GetSSO(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	sso, err := h.Store.GetSSOProvider(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, map[string]interface{}{"enabled": false})
	}
	return c.JSON(http.StatusOK, sso)
}

func (h *EnterpriseHandler) ConfigureSSO(c echo.Context) error {
	var req struct {
		Type         string `json:"type"`
		Domain       string `json:"domain"`
		MetadataURL  string `json:"metadata_url"`
		ClientID     string `json:"client_id"`
		ClientSecret string `json:"client_secret"`
		Enabled      bool   `json:"enabled"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	sso, err := h.Store.UpsertSSOProvider(c.Request().Context(), db.UpsertSSOProviderParams{
		TenantID:     tenantID,
		Type:         req.Type,
		Domain:       req.Domain,
		MetadataUrl:  pgtype.Text{String: req.MetadataURL, Valid: req.MetadataURL != ""},
		ClientID:     pgtype.Text{String: req.ClientID, Valid: req.ClientID != ""},
		ClientSecret: pgtype.Text{String: req.ClientSecret, Valid: req.ClientSecret != ""},
		Enabled:      req.Enabled,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, sso)
}

func (h *EnterpriseHandler) GetSCIM(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	scim, err := h.Store.GetSCIMDirectory(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, map[string]interface{}{"enabled": false})
	}
	return c.JSON(http.StatusOK, scim)
}

func (h *EnterpriseHandler) GenerateSCIM(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	bytes := make([]byte, 32)
	rand.Read(bytes)
	token := "scim_" + hex.EncodeToString(bytes)

	scim, err := h.Store.UpsertSCIMDirectory(c.Request().Context(), db.UpsertSCIMDirectoryParams{
		TenantID: tenantID,
		Token:    token,
		Enabled:  true,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, scim)
}

func (h *EnterpriseHandler) ListAuditLogs(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	// Mock creating a log entry for demo purposes
	h.Store.CreateEnterpriseAuditLog(c.Request().Context(), db.CreateEnterpriseAuditLogParams{
		TenantID:    tenantID,
		Action:      "view_audit_logs",
		Resource:    "enterprise_settings",
		DetailsJson: []byte("{}"),
	})

	logs, err := h.Store.ListEnterpriseAuditLogs(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, logs)
}
