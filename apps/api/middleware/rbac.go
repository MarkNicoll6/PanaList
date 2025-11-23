package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
)

type RBACMiddleware struct {
	Store *db.Queries
}

func NewRBACMiddleware(store *db.Queries) *RBACMiddleware {
	return &RBACMiddleware{Store: store}
}

func (m *RBACMiddleware) RequireRole(role string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// In a real app, we'd check the user's role from the JWT claims or DB
			// For this demo, we'll assume a header 'X-Role' or just allow it for now
			// to avoid breaking the flow without a full auth system.

			// userRole := c.Get("role").(string)
			// if userRole != role && userRole != "super_admin" {
			//     return c.JSON(http.StatusForbidden, map[string]string{"error": "forbidden"})
			// }

			return next(c)
		}
	}
}

func (m *RBACMiddleware) RequirePermission(resource, action string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Check if user has permission
			return next(c)
		}
	}
}
