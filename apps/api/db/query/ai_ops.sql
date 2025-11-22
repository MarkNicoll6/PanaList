-- name: CreateOpsFinding :one
INSERT INTO ops_findings (tenant_id, type, entity, entity_id, severity, details_json)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: ListOpsFindings :many
SELECT * FROM ops_findings
WHERE tenant_id = $1 AND status = 'open'
ORDER BY created_at DESC;

-- name: ResolveOpsFinding :exec
UPDATE ops_findings
SET status = 'resolved', resolved_at = NOW()
WHERE id = $1 AND tenant_id = $2;

-- name: CreateTrendSignal :one
INSERT INTO trend_signals (tenant_id, category_id, score, evidence_json)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListTopTrends :many
SELECT * FROM trend_signals
WHERE tenant_id = $1
ORDER BY score DESC
LIMIT 10;
