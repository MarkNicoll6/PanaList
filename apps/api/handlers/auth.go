package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type AuthHandler struct {
	Store *db.Queries
	DB    *pgxpool.Pool
}

func NewAuthHandler(store *db.Queries, db *pgxpool.Pool) *AuthHandler {
	return &AuthHandler{Store: store, DB: db}
}

func (h *AuthHandler) RegisterRoutes(g *echo.Group) {
	g.POST("/magic-link", h.RequestMagicLink)
	g.POST("/verify", h.VerifyMagicLink)
}

type MagicLinkRequest struct {
	Email string `json:"email"`
}

func (h *AuthHandler) RequestMagicLink(c echo.Context) error {
	var req MagicLinkRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	// Generate Magic Link Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": req.Email,
		"exp":   time.Now().Add(15 * time.Minute).Unix(),
		"type":  "magic_link",
	})

	secret := os.Getenv("MAGIC_LINK_SECRET")
	if secret == "" {
		secret = "changeme"
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
	}

	// In a real app, send email. For now, log it.
	c.Logger().Infof("Magic Link for %s: /auth/verify?token=%s", req.Email, tokenString)

	return c.JSON(http.StatusOK, map[string]string{"message": "magic link sent", "debug_token": tokenString})
}

type VerifyRequest struct {
	Token string `json:"token"`
}

func (h *AuthHandler) VerifyMagicLink(c echo.Context) error {
	var req VerifyRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	secret := os.Getenv("MAGIC_LINK_SECRET")
	if secret == "" {
		secret = "changeme"
	}

	token, err := jwt.Parse(req.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || claims["type"] != "magic_link" {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token type"})
	}

	email := claims["email"].(string)

	// Check if user exists, create if not (simplified for V1)
	// In real app, we might want to check DB.
	// For now, we just issue an access token.

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
		"type":  "access",
	})

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "changeme"
	}

	accessTokenString, err := accessToken.SignedString([]byte(jwtSecret))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to generate access token"})
	}

	return c.JSON(http.StatusOK, map[string]string{"token": accessTokenString})
}
