package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type CMSHandler struct {
	Store *db.Queries
}

func NewCMSHandler(store *db.Queries) *CMSHandler {
	return &CMSHandler{Store: store}
}

func (h *CMSHandler) RegisterRoutes(g *echo.Group) {
	cms := g.Group("/cms")
	cms.GET("/posts", h.ListPosts)
	cms.POST("/posts", h.CreatePost)
	cms.GET("/pages", h.ListPages)
	cms.POST("/pages", h.CreatePage)
	cms.GET("/media", h.ListMedia)
	cms.POST("/media", h.CreateMedia)
}

func (h *CMSHandler) ListPosts(c echo.Context) error {
	// Mock tenant ID
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Replace with actual context

	posts, err := h.Store.ListPosts(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, posts)
}

func (h *CMSHandler) CreatePost(c echo.Context) error {
	var req struct {
		Title   string `json:"title"`
		Slug    string `json:"slug"`
		Content string `json:"content"` // JSON string
		Excerpt string `json:"excerpt"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Mock tenant ID
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	post, err := h.Store.CreatePost(c.Request().Context(), db.CreatePostParams{
		TenantID:    tenantID,
		Title:       req.Title,
		Slug:        req.Slug,
		ContentJson: []byte(req.Content),
		Excerpt:     pgtype.Text{String: req.Excerpt, Valid: true},
		Status:      pgtype.Text{String: "draft", Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, post)
}

func (h *CMSHandler) ListPages(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	pages, err := h.Store.ListPages(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, pages)
}

func (h *CMSHandler) CreatePage(c echo.Context) error {
	var req struct {
		Title   string `json:"title"`
		Slug    string `json:"slug"`
		Content string `json:"content"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	page, err := h.Store.CreatePage(c.Request().Context(), db.CreatePageParams{
		TenantID:    tenantID,
		Title:       req.Title,
		Slug:        req.Slug,
		ContentJson: []byte(req.Content),
		Status:      pgtype.Text{String: "draft", Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, page)
}

func (h *CMSHandler) ListMedia(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	media, err := h.Store.ListMedia(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, media)
}

func (h *CMSHandler) CreateMedia(c echo.Context) error {
	// Mock upload - in real app, upload to S3/R2
	var req struct {
		Filename string `json:"filename"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0")

	media, err := h.Store.CreateMedia(c.Request().Context(), db.CreateMediaParams{
		TenantID:  tenantID,
		Filename:  req.Filename,
		Url:       "https://placehold.co/600x400?text=" + req.Filename, // Mock URL
		MimeType:  pgtype.Text{String: "image/jpeg", Valid: true},
		SizeBytes: pgtype.Int8{Int64: 1024, Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, media)
}
