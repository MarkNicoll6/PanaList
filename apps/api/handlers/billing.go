package handlers

import (
	"io"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/panadirectory/api/db"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
	"github.com/stripe/stripe-go/v76/webhook"
)

type BillingHandler struct {
	Store *db.Queries
}

func NewBillingHandler(store *db.Queries) *BillingHandler {
	return &BillingHandler{Store: store}
}

func (h *BillingHandler) RegisterRoutes(g *echo.Group) {
	g.POST("/billing/checkout", h.CreateCheckoutSession)
	g.POST("/billing/portal", h.CreatePortalSession)
	g.POST("/stripe/webhook", h.HandleWebhook)
}

func (h *BillingHandler) CreateCheckoutSession(c echo.Context) error {
	// Simplified for V2 demo
	priceID := "price_123" // In real app, get from request/plan
	domain := os.Getenv("BASE_URL")
	if domain == "" {
		domain = "http://localhost:5173"
	}

	params := &stripe.CheckoutSessionParams{
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Price:    stripe.String(priceID),
				Quantity: stripe.Int64(1),
			},
		},
		Mode:       stripe.String(string(stripe.CheckoutSessionModeSubscription)),
		SuccessURL: stripe.String(domain + "/admin/billing?success=true"),
		CancelURL:  stripe.String(domain + "/admin/billing?canceled=true"),
	}

	s, err := session.New(params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"url": s.URL})
}

func (h *BillingHandler) CreatePortalSession(c echo.Context) error {
	// Placeholder for Customer Portal
	return c.JSON(http.StatusOK, map[string]string{"url": "https://billing.stripe.com/p/session/test"})
}

func (h *BillingHandler) HandleWebhook(c echo.Context) error {
	const MaxBodyBytes = int64(65536)
	c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, MaxBodyBytes)
	payload, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	endpointSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	// Pass the request body and Stripe-Signature header to ConstructEvent
	event, err := webhook.ConstructEvent(payload, c.Request().Header.Get("Stripe-Signature"), endpointSecret)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	// Handle the event
	switch event.Type {
	case "checkout.session.completed":
		// Fulfill the purchase...
	case "invoice.payment_succeeded":
		// Continue to provision the subscription...
	}

	return c.NoContent(http.StatusOK)
}
