-- name: GetFederationOptIn :one
SELECT * FROM federation_optin
WHERE tenant_id = $1;

-- name: UpsertFederationOptIn :one
INSERT INTO federation_optin (tenant_id, enabled, categories_json, regions_json)
VALUES ($1, $2, $3, $4)
ON CONFLICT (tenant_id) DO UPDATE
SET enabled = $2, categories_json = $3, regions_json = $4
RETURNING *;

-- name: AddToFederationIndex :one
INSERT INTO federation_index (tenant_id, listing_id, normalized_json)
VALUES ($1, $2, $3)
RETURNING *;

-- name: SearchFederationIndex :many
SELECT * FROM federation_index
WHERE normalized_json->>'title' ILIKE '%' || @query::text || '%'
LIMIT 50;

-- name: LogFederationQuery :exec
INSERT INTO federation_queries (query, filters_json, results_count)
VALUES ($1, $2, $3);

-- name: GetFederationStats :one
SELECT 
    (SELECT COUNT(*) FROM federation_index) as total_listings,
    (SELECT COUNT(*) FROM federation_queries) as total_queries;
