package handlers

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type BlogHandler struct {
	Store *db.Queries
}

func NewBlogHandler(store *db.Queries) *BlogHandler {
	return &BlogHandler{Store: store}
}

func (h *BlogHandler) RegisterRoutes(g *echo.Group) {
	blog := g.Group("/posts")
	blog.GET("", h.ListPosts)
	blog.POST("", h.CreatePost)
	blog.GET("/:id", h.GetPost)
	blog.PUT("/:id", h.UpdatePost)
	blog.POST("/:id/publish", h.PublishPost)
	blog.POST("/:id/archive", h.ArchivePost)
}

func (h *BlogHandler) RegisterPublicRoutes(g *echo.Group) {
	public := g.Group("/public/posts")
	public.GET("", h.GetPublicPosts)
	public.GET("/:slug", h.GetPublicPostBySlug)
}

func (h *BlogHandler) ListPosts(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	posts, err := h.Store.ListBlogPosts(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, posts)
}

func (h *BlogHandler) GetPost(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	var id pgtype.UUID
	if err := id.Scan(c.Param("id")); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	post, err := h.Store.GetBlogPost(c.Request().Context(), db.GetBlogPostParams{
		TenantID: tenantID,
		ID:       id,
	})
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "post not found"})
	}
	return c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) CreatePost(c echo.Context) error {
	var req struct {
		Title           string   `json:"title"`
		Slug            string   `json:"slug"`
		ContentJson     []byte   `json:"content_json"`
		Excerpt         string   `json:"excerpt"`
		Sector          string   `json:"sector"`
		Tags            []string `json:"tags"`
		MetaDescription string   `json:"meta_description"`
		CustomMetaTags  string   `json:"custom_meta_tags"`
		OgImageUrl      string   `json:"og_image_url"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	// Handle tags array for pgx
	// Assuming []string maps to []string in generated code or we need to convert
	// For now, passing directly, if sqlc generated []string it works.

	post, err := h.Store.CreateBlogPost(c.Request().Context(), db.CreateBlogPostParams{
		TenantID:        tenantID,
		Title:           req.Title,
		Slug:            req.Slug,
		ContentJson:     req.ContentJson,
		Excerpt:         pgtype.Text{String: req.Excerpt, Valid: true},
		Status:          pgtype.Text{String: "DRAFT", Valid: true},
		Sector:          pgtype.Text{String: req.Sector, Valid: true},
		Tags:            req.Tags,
		MetaDescription: pgtype.Text{String: req.MetaDescription, Valid: true},
		CustomMetaTags:  pgtype.Text{String: req.CustomMetaTags, Valid: true},
		OgImageUrl:      pgtype.Text{String: req.OgImageUrl, Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, post)
}

func (h *BlogHandler) UpdatePost(c echo.Context) error {
	var req struct {
		Title           string   `json:"title"`
		Slug            string   `json:"slug"`
		ContentJson     []byte   `json:"content_json"`
		Excerpt         string   `json:"excerpt"`
		Status          string   `json:"status"`
		Sector          string   `json:"sector"`
		Tags            []string `json:"tags"`
		MetaDescription string   `json:"meta_description"`
		CustomMetaTags  string   `json:"custom_meta_tags"`
		OgImageUrl      string   `json:"og_image_url"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	var id pgtype.UUID
	if err := id.Scan(c.Param("id")); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	post, err := h.Store.UpdateBlogPost(c.Request().Context(), db.UpdateBlogPostParams{
		TenantID:        tenantID,
		ID:              id,
		Title:           req.Title,
		Slug:            req.Slug,
		ContentJson:     req.ContentJson,
		Excerpt:         pgtype.Text{String: req.Excerpt, Valid: true},
		Status:          pgtype.Text{String: req.Status, Valid: true},
		Sector:          pgtype.Text{String: req.Sector, Valid: true},
		Tags:            req.Tags,
		MetaDescription: pgtype.Text{String: req.MetaDescription, Valid: true},
		CustomMetaTags:  pgtype.Text{String: req.CustomMetaTags, Valid: true},
		OgImageUrl:      pgtype.Text{String: req.OgImageUrl, Valid: true},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) PublishPost(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	var id pgtype.UUID
	if err := id.Scan(c.Param("id")); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	post, err := h.Store.PublishBlogPost(c.Request().Context(), db.PublishBlogPostParams{
		TenantID: tenantID,
		ID:       id,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) ArchivePost(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	var id pgtype.UUID
	if err := id.Scan(c.Param("id")); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	post, err := h.Store.ArchiveBlogPost(c.Request().Context(), db.ArchiveBlogPostParams{
		TenantID: tenantID,
		ID:       id,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) GetPublicPosts(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	posts, err := h.Store.GetPublicPosts(c.Request().Context(), tenantID)
	if err != nil {
		return c.JSON(http.StatusOK, []interface{}{})
	}
	return c.JSON(http.StatusOK, posts)
}

func (h *BlogHandler) GetPublicPostBySlug(c echo.Context) error {
	var tenantID pgtype.UUID
	tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock

	slug := c.Param("slug")

	post, err := h.Store.GetPublicPostBySlug(c.Request().Context(), db.GetPublicPostBySlugParams{
		TenantID: tenantID,
		Slug:     slug,
	})
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "post not found"})
	}
	return c.JSON(http.StatusOK, post)
}
