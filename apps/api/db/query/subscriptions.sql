-- name: CreateSubscription :one
INSERT INTO subscriptions (
  tenant_id, plan_id, status, stripe_sub_id, current_period_end
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetSubscriptionByStripeID :one
SELECT * FROM subscriptions
WHERE stripe_sub_id = $1 LIMIT 1;

-- name: UpdateSubscriptionStatus :one
UPDATE subscriptions
SET status = $2, current_period_end = $3
WHERE stripe_sub_id = $1
RETURNING *;
