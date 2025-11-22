-- name: CreateTenant :one
INSERT INTO tenants (
  name, slug, domains, theme_id, plan
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetTenantBySlug :one
SELECT * FROM tenants
WHERE slug = $1 LIMIT 1;

-- name: GetTenantByID :one
SELECT * FROM tenants
WHERE id = $1 LIMIT 1;
