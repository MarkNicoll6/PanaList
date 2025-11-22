-- name: CreateAPIKey :one
INSERT INTO api_keys (tenant_id, name, hash, scopes_json)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListAPIKeys :many
SELECT * FROM api_keys
WHERE tenant_id = $1 AND revoked_at IS NULL
ORDER BY created_at DESC;

-- name: RevokeAPIKey :exec
UPDATE api_keys
SET revoked_at = NOW()
WHERE id = $1 AND tenant_id = $2;

-- name: CreateWebhookEndpoint :one
INSERT INTO webhook_endpoints (tenant_id, url, secret, events_json)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListWebhookEndpoints :many
SELECT * FROM webhook_endpoints
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: CreateWebhookDelivery :one
INSERT INTO webhook_deliveries (tenant_id, endpoint_id, event, payload_json, status, attempts)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
