-- name: CreateComplianceScan :one
INSERT INTO compliance_scans (tenant_id, status, summary_json)
VALUES ($1, $2, $3)
RETURNING *;

-- name: ListComplianceScans :many
SELECT * FROM compliance_scans
ORDER BY created_at DESC
LIMIT 50;

-- name: CreateComplianceIssue :one
INSERT INTO compliance_issues (tenant_id, scan_id, category, severity, description, status)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: ListComplianceIssues :many
SELECT * FROM compliance_issues
WHERE tenant_id = $1
ORDER BY detected_at DESC;

-- name: ListAllComplianceIssues :many
SELECT * FROM compliance_issues
ORDER BY detected_at DESC
LIMIT 100;

-- name: CreateEvidenceExport :one
INSERT INTO evidence_exports (tenant_id, template, format, status, created_by)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ListEvidenceExports :many
SELECT * FROM evidence_exports
ORDER BY created_at DESC
LIMIT 50;

-- name: ListRBACRoles :many
SELECT * FROM rbac_roles
ORDER BY name;

-- name: CreateRBACRole :one
INSERT INTO rbac_roles (name, description, is_system)
VALUES ($1, $2, $3)
RETURNING *;

-- name: ListRBACPermissions :many
SELECT * FROM rbac_permissions
WHERE role_id = $1;

-- name: AddRBACPermission :one
INSERT INTO rbac_permissions (role_id, resource, action)
VALUES ($1, $2, $3)
RETURNING *;
