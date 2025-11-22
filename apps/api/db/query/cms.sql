-- name: CreatePost :one
INSERT INTO posts (
  tenant_id, title, slug, content_json, excerpt, status, published_at, author_id
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING *;

-- name: GetPost :one
SELECT * FROM posts
WHERE id = $1 AND tenant_id = $2 LIMIT 1;

-- name: ListPosts :many
SELECT * FROM posts
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: UpdatePost :one
UPDATE posts
SET title = $3, slug = $4, content_json = $5, excerpt = $6, status = $7, published_at = $8, updated_at = NOW()
WHERE id = $1 AND tenant_id = $2
RETURNING *;

-- name: CreatePage :one
INSERT INTO pages (
  tenant_id, title, slug, content_json, status
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: ListPages :many
SELECT * FROM pages
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: CreateMedia :one
INSERT INTO media (
  tenant_id, filename, url, mime_type, size_bytes
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: ListMedia :many
SELECT * FROM media
WHERE tenant_id = $1
ORDER BY created_at DESC;
