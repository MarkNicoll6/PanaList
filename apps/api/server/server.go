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

	billingHandler := handlers.NewBillingHandler(s.Store)
	v2Group := s.Router.Group("/api/v2")
	billingHandler.RegisterRoutes(v2Group)

	adsHandler := handlers.NewAdsHandler(s.Store)
	adsHandler.RegisterRoutes(v2Group)

	analyticsHandler := handlers.NewAnalyticsHandler(s.Store)
	analyticsHandler.RegisterRoutes(v2Group)

	personalisationHandler := handlers.NewPersonalisationHandler(s.Store)
	personalisationHandler.RegisterRoutes(v2Group)

	marketplaceHandler := handlers.NewMarketplaceHandler(s.Store)
	marketplaceHandler.RegisterRoutes(v2Group)

	cmsHandler := handlers.NewCMSHandler(s.Store)
	cmsHandler.RegisterRoutes(v2Group)

	aiHandler := handlers.NewAIHandler(s.Store)
	aiHandler.RegisterRoutes(v2Group)

	developersHandler := handlers.NewDevelopersHandler(s.Store)
	v3Group := s.Router.Group("/api/v3")
	developersHandler.RegisterRoutes(v3Group)

	federationHandler := handlers.NewFederationHandler(s.Store)
	federationHandler.RegisterRoutes(v3Group)

	opsHandler := handlers.NewOpsHandler(s.Store)
	opsHandler.RegisterRoutes(v3Group)

	v3MarketplaceHandler := handlers.NewMarketplaceHandler(s.Store)
	v3MarketplaceHandler.RegisterRoutes(v3Group)

	communityHandler := handlers.NewCommunityHandler(s.Store)
	communityHandler.RegisterRoutes(v3Group)

	enterpriseHandler := handlers.NewEnterpriseHandler(s.Store)
	enterpriseHandler.RegisterRoutes(v3Group)
}
