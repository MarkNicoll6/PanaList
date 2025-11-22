package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type PersonalisationHandler struct {
	Store *db.Queries
}

func NewPersonalisationHandler(store *db.Queries) *PersonalisationHandler {
	return &PersonalisationHandler{Store: store}
}

func (h *PersonalisationHandler) RegisterRoutes(g *echo.Group) {
	g.POST("/personalisation/rules", h.CreateRule)
	g.GET("/recommendations", h.GetRecommendations)
}

func (h *PersonalisationHandler) CreateRule(c echo.Context) error {
	// Mock rule creation
	return c.JSON(http.StatusCreated, map[string]string{"status": "created"})
}

func (h *PersonalisationHandler) GetRecommendations(c echo.Context) error {
	// Mock tenant ID
	var tenantID pgtype.UUID

	recs, err := h.Store.GetRecommendations(c.Request().Context(), db.GetRecommendationsParams{
		TenantID: tenantID,
		Limit:    5,
	})
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, recs)
}
