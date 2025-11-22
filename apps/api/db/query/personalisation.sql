-- name: CreatePersonalisationRule :one
INSERT INTO personalisation_rules (
  tenant_id, rule_json, is_active
) VALUES (
  $1, $2, $3
) RETURNING *;

-- name: ListPersonalisationRules :many
SELECT * FROM personalisation_rules
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: GetRecommendations :many
SELECT l.*, r.score
FROM recommendations r
JOIN listings l ON r.listing_id = l.id
WHERE r.tenant_id = $1
ORDER BY r.score DESC
LIMIT $2;
