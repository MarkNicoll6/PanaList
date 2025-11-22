-- name: InstallMarketplaceItem :one
INSERT INTO marketplace_installs (tenant_id, type, external_id, config_json)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListInstalledItems :many
SELECT * FROM marketplace_installs
WHERE tenant_id = $1
ORDER BY installed_at DESC;

-- name: CreateCommunityPost :one
INSERT INTO community_posts (tenant_id, title, content, category)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListCommunityPosts :many
SELECT * FROM community_posts
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: CreateReview :one
INSERT INTO community_reviews (tenant_id, listing_id, author_name, rating, comment)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ListReviews :many
SELECT * FROM community_reviews
WHERE listing_id = $1
ORDER BY created_at DESC;
