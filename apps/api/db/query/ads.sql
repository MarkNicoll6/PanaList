-- name: CreateAdZone :one
INSERT INTO ad_zones (
  tenant_id, code, name, placement, size, pricing_cents
) VALUES (
  $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: ListAdZones :many
SELECT * FROM ad_zones
WHERE tenant_id = $1;

-- name: CreateAdCreative :one
INSERT INTO ad_creatives (
  tenant_id, zone_id, title, image_url, target_url, starts_at, ends_at
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: ListActiveAdsForZone :many
SELECT * FROM ad_creatives
WHERE zone_id = $1 AND status = 'active'
  AND (starts_at IS NULL OR starts_at <= NOW())
  AND (ends_at IS NULL OR ends_at >= NOW())
ORDER BY created_at DESC;
