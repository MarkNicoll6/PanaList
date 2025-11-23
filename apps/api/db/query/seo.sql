-- name: GetSEOSettings :one
SELECT * FROM tenant_seo_settings WHERE tenant_id = $1;

-- name: UpsertSEOSettings :one
INSERT INTO tenant_seo_settings (
    tenant_id, site_title_pattern, meta_description_pattern, 
    default_og_image_url, canonical_base_url, robots_directives_json, 
    noindex_sections_json, schema_profile
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
)
ON CONFLICT (tenant_id) DO UPDATE SET
    site_title_pattern = EXCLUDED.site_title_pattern,
    meta_description_pattern = EXCLUDED.meta_description_pattern,
    default_og_image_url = EXCLUDED.default_og_image_url,
    canonical_base_url = EXCLUDED.canonical_base_url,
    robots_directives_json = EXCLUDED.robots_directives_json,
    noindex_sections_json = EXCLUDED.noindex_sections_json,
    schema_profile = EXCLUDED.schema_profile,
    updated_at = NOW()
RETURNING *;

-- name: ListTopicClusters :many
SELECT * FROM seo_topic_clusters WHERE tenant_id = $1 ORDER BY created_at DESC;

-- name: CreateTopicCluster :one
INSERT INTO seo_topic_clusters (
    tenant_id, slug, type, title, target_keywords, parent_hub_id, status, metadata_json
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING *;

-- name: GetLatestSEOHealth :one
SELECT * FROM seo_health_snapshots 
WHERE tenant_id = $1 
ORDER BY captured_at DESC 
LIMIT 1;
