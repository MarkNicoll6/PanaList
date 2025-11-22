-- name: CreatePlan :one
INSERT INTO plans (
  tenant_id, code, name, price_cents, interval, features_json
) VALUES (
  $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: ListPlans :many
SELECT * FROM plans
WHERE tenant_id = $1 AND is_active = true
ORDER BY price_cents;
