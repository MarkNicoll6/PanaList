-- name: CreateListing :one
INSERT INTO listings (
  tenant_id, title, slug, category_id, status
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetListing :one
SELECT * FROM listings
WHERE id = $1 AND tenant_id = $2 LIMIT 1;

-- name: ListListings :many
SELECT * FROM listings
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: UpdateListingStatus :one
UPDATE listings
SET status = $3, updated_at = NOW()
WHERE id = $1 AND tenant_id = $2
RETURNING *;
