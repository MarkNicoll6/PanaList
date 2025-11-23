-- name: ListBlogPosts :many
SELECT * FROM posts 
WHERE tenant_id = $1 
ORDER BY created_at DESC;

-- name: GetBlogPost :one
SELECT * FROM posts 
WHERE tenant_id = $1 AND id = $2;

-- name: GetBlogPostBySlug :one
SELECT * FROM posts 
WHERE tenant_id = $1 AND slug = $2;

-- name: CreateBlogPost :one
INSERT INTO posts (
    tenant_id, title, slug, content_json, excerpt, status, author_id, 
    sector, tags, meta_description, custom_meta_tags, og_image_url
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12
) RETURNING *;

-- name: UpdateBlogPost :one
UPDATE posts SET 
    title = $3, 
    slug = $4, 
    content_json = $5, 
    excerpt = $6, 
    status = $7, 
    author_id = $8,
    sector = $9, 
    tags = $10, 
    meta_description = $11, 
    custom_meta_tags = $12, 
    og_image_url = $13,
    updated_at = NOW()
WHERE tenant_id = $1 AND id = $2
RETURNING *;

-- name: PublishBlogPost :one
UPDATE posts SET 
    status = 'PUBLISHED', 
    published_at = NOW(),
    updated_at = NOW()
WHERE tenant_id = $1 AND id = $2
RETURNING *;

-- name: ArchiveBlogPost :one
UPDATE posts SET 
    status = 'ARCHIVED', 
    updated_at = NOW()
WHERE tenant_id = $1 AND id = $2
RETURNING *;

-- name: GetPublicPosts :many
SELECT * FROM posts 
WHERE tenant_id = $1 AND status = 'PUBLISHED' 
ORDER BY published_at DESC;

-- name: GetPublicPostBySlug :one
SELECT * FROM posts 
WHERE tenant_id = $1 AND slug = $2 AND status = 'PUBLISHED';
