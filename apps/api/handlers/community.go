package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type CommunityHandler struct {
	Store *db.Queries
}

func NewCommunityHandler(store *db.Queries) *CommunityHandler {
	return &CommunityHandler{Store: store}
}

func (h *CommunityHandler) RegisterRoutes(g *echo.Group) {
	comm := g.Group("/community")
	comm.GET("/posts", h.ListPosts)
	comm.POST("/posts", h.CreatePost)
	comm.POST("/reviews", h.CreateReview)
}

func (h *CommunityHandler) ListPosts(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	posts, err := h.Store.ListCommunityPosts(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, posts)
}

func (h *CommunityHandler) CreatePost(c echo.Context) error {
	var req struct {
		Title    string `json:"title"`
		Content  string `json:"content"`
		Category string `json:"category"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	post, err := h.Store.CreateCommunityPost(c.Request().Context(), db.CreateCommunityPostParams{
		TenantID: tenantID,
		Title:    req.Title,
		Content:  req.Content,
		Category: req.Category,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, post)
}

func (h *CommunityHandler) CreateReview(c echo.Context) error {
	var req struct {
		ListingID string `json:"listing_id"`
		Rating    int    `json:"rating"`
		Comment   string `json:"comment"`
		Author    string `json:"author"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	var listingID pgtype.UUID
	listingID.Scan(req.ListingID)

	review, err := h.Store.CreateReview(c.Request().Context(), db.CreateReviewParams{
		TenantID:   tenantID,
		ListingID:  listingID,
		AuthorName: req.Author,
		Rating:     int32(req.Rating),
		Comment:    pgtype.Text{String: req.Comment, Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, review)
}
