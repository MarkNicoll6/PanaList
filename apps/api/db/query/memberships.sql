-- name: CreateMembership :one
INSERT INTO memberships (
  tenant_id, user_id, role
) VALUES (
  $1, $2, $3
) RETURNING *;

-- name: GetMembership :one
SELECT * FROM memberships
WHERE tenant_id = $1 AND user_id = $2 LIMIT 1;
