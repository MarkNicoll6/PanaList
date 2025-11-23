package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type OnboardingHandler struct {
	Store *db.Queries
}

func NewOnboardingHandler(store *db.Queries) *OnboardingHandler {
	return &OnboardingHandler{Store: store}
}

func (h *OnboardingHandler) RegisterRoutes(g *echo.Group) {
	onboarding := g.Group("/onboarding")
	onboarding.GET("/tours", h.ListTourStates)
	onboarding.POST("/tours/:tourId/state", h.UpdateTourState)
}

func (h *OnboardingHandler) ListTourStates(c echo.Context) error {
	// Mock tenant/user for now
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")
	var userID pgtype.UUID
	userID.Scan("user-123")

	states, err := h.Store.ListTourStates(c.Request().Context(), db.ListTourStatesParams{
		TenantID: tenantID,
		UserID:   userID,
	})
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, states)
}

func (h *OnboardingHandler) UpdateTourState(c echo.Context) error {
	tourID := c.Param("tourId")
	var req struct {
		Status        string `json:"status"`
		LastStepIndex int32  `json:"last_step_index"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Mock tenant/user for now
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")
	var userID pgtype.UUID
	userID.Scan("user-123")

	state, err := h.Store.UpsertTourState(c.Request().Context(), db.UpsertTourStateParams{
		TenantID:      tenantID,
		UserID:        userID,
		TourID:        tourID,
		Status:        req.Status,
		LastStepIndex: req.LastStepIndex,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, state)
}
