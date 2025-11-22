-- name: UpsertSSOProvider :one
INSERT INTO sso_providers (tenant_id, type, domain, metadata_url, client_id, client_secret, enabled)
VALUES ($1, $2, $3, $4, $5, $6, $7)
ON CONFLICT (id) DO UPDATE -- Ideally conflict on tenant_id if 1 per tenant, but schema uses UUID PK. For now insert new.
SET type = $2, domain = $3, metadata_url = $4, client_id = $5, client_secret = $6, enabled = $7
RETURNING *;

-- name: GetSSOProvider :one
SELECT * FROM sso_providers
WHERE tenant_id = $1
LIMIT 1;

-- name: UpsertSCIMDirectory :one
INSERT INTO scim_directories (tenant_id, token, enabled)
VALUES ($1, $2, $3)
ON CONFLICT (id) DO UPDATE
SET token = $2, enabled = $3
RETURNING *;

-- name: GetSCIMDirectory :one
SELECT * FROM scim_directories
WHERE tenant_id = $1
LIMIT 1;

-- name: ListEnterpriseAuditLogs :many
SELECT * FROM enterprise_audit_logs
WHERE tenant_id = $1
ORDER BY created_at DESC
LIMIT 100;

-- name: CreateEnterpriseAuditLog :exec
INSERT INTO enterprise_audit_logs (tenant_id, actor_id, action, resource, details_json)
VALUES ($1, $2, $3, $4, $5);
