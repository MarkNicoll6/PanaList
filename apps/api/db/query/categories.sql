-- name: CreateCategory :one
INSERT INTO categories (
  tenant_id, name, slug, description, parent_id
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: ListCategories :many
SELECT * FROM categories
WHERE tenant_id = $1
ORDER BY name;
