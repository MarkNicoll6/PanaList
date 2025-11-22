-- name: ListThemes :many
SELECT * FROM themes_market
WHERE status = 'published'
ORDER BY created_at DESC;

-- name: ListBlocks :many
SELECT * FROM blocks_market
WHERE status = 'published'
ORDER BY created_at DESC;

-- name: InstallItem :one
INSERT INTO tenant_installs (
  tenant_id, item_type, item_id, version
) VALUES (
  $1, $2, $3, $4
) RETURNING *;

-- name: CreateTheme :one
INSERT INTO themes_market (
  author_tenant_id, name, thumb_url, price_cents, metadata_json, status
) VALUES (
  $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: CreateBlock :one
INSERT INTO blocks_market (
  author_tenant_id, name, version, price_cents, schema_json, bundle_url, status
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
) RETURNING *;
