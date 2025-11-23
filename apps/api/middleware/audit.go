package middleware

import (
	"encoding/json"
	"net/netip"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type AuditMiddleware struct {
	Store *db.Queries
}

func NewAuditMiddleware(store *db.Queries) *AuditMiddleware {
	return &AuditMiddleware{Store: store}
}

func (m *AuditMiddleware) LogAction(action string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Execute the handler first
			err := next(c)
			if err != nil {
				return err
			}

			// If successful, log the action
			// In a real app, we'd extract user/tenant from context/JWT
			// For now, we'll use mock IDs or extract if available
			var tenantID pgtype.UUID
			tenantID.Scan("6a4d7bb2-493b-4910-894b-76c2b8da09c0") // Mock tenant
			var userID pgtype.UUID
			userID.Scan("user-123") // Mock user

			// Extract IP and User Agent
			ip := c.RealIP()
			userAgent := c.Request().UserAgent()

			// Extract details if available (e.g. from request body or response)
			// This is simplified; normally we'd capture more context
			details := map[string]interface{}{
				"method": c.Request().Method,
				"path":   c.Request().URL.Path,
				"status": c.Response().Status,
			}
			detailsJSON, _ := json.Marshal(details)

			// Log to DB asynchronously to not block response
			go func() {
				// Create a new context for the DB operation as the request context might be cancelled
				// ctx := context.Background()
				// Using background context in a real app, but here we need the store which uses context
				// For simplicity in this example, we'll skip the context handling for the async goroutine
				// or assume the store handles it.
				// actually sqlc requires context.

				// m.Store.CreateAuditLog(context.Background(), db.CreateAuditLogParams{...})
				// We'll implement this properly when we wire it up, for now just the struct
			}()

			// Synchronous logging for now to ensure it works in this demo
			var ipAddr *netip.Addr
			if ip != "" {
				parsed, err := netip.ParseAddr(ip)
				if err == nil {
					ipAddr = &parsed
				}
			}

			m.Store.CreateAuditLog(c.Request().Context(), db.CreateAuditLogParams{
				TenantID:    tenantID,
				ActorID:     userID,
				Action:      action,
				Resource:    c.Request().URL.Path,
				DetailsJson: detailsJSON,
				Ip:          ipAddr,
				UserAgent:   pgtype.Text{String: userAgent, Valid: true},
			})

			return nil
		}
	}
}
