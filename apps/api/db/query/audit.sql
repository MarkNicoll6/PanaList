-- name: CreateAuditLog :one
INSERT INTO enterprise_audit_logs (tenant_id, actor_id, action, resource, details_json, ip, user_agent)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: ListAuditLogs :many
SELECT * FROM enterprise_audit_logs
WHERE tenant_id = $1
ORDER BY created_at DESC
LIMIT 100;

-- name: ListGlobalAuditLogs :many
SELECT * FROM enterprise_audit_logs
ORDER BY created_at DESC
LIMIT 100;
