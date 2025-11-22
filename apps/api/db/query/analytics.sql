-- name: GetDailyMetrics :many
SELECT * FROM metrics_daily
WHERE tenant_id = $1 AND date >= $2 AND date <= $3
ORDER BY date;

-- name: RecordListingEvent :one
INSERT INTO listing_events (
  tenant_id, listing_id, event, meta_json
) VALUES (
  $1, $2, $3, $4
) RETURNING *;

-- name: GetTopListingsByEvents :many
SELECT 
    l.id, l.title, l.slug,
    COUNT(le.id) as event_count
FROM listings l
JOIN listing_events le ON l.id = le.listing_id
WHERE l.tenant_id = $1 AND le.event = $2
GROUP BY l.id
ORDER BY event_count DESC
LIMIT $3;
