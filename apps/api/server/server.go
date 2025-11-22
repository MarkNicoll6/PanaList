package server

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/panadirectory/api/db"
	"github.com/panadirectory/api/handlers"
)

type Server struct {
	Router *echo.Echo
	Store  *db.Queries
	DB     *pgxpool.Pool
}

func NewServer(ctx context.Context, dbURL string) (*Server, error) {
	pool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		return nil, err
	}

	store := db.New(pool)
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	s := &Server{
		Router: e,
		Store:  store,
		DB:     pool,
	}
	s.setupRoutes()
	return s, nil
}

func (s *Server) Start(address string) error {
	return s.Router.Start(address)
}

func (s *Server) setupRoutes() {
	s.Router.GET("/health", func(c echo.Context) error {
		return c.String(200, "OK")
	})

	authHandler := handlers.NewAuthHandler(s.Store, s.DB)
	authGroup := s.Router.Group("/api/v1/auth")
	authHandler.RegisterRoutes(authGroup)
}
