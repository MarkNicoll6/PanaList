-- name: UpsertTourState :one
INSERT INTO user_tour_states (tenant_id, user_id, tour_id, status, last_step_index, updated_at)
VALUES ($1, $2, $3, $4, $5, NOW())
ON CONFLICT (tenant_id, user_id, tour_id) DO UPDATE
SET status = $4, last_step_index = $5, updated_at = NOW()
RETURNING *;

-- name: ListTourStates :many
SELECT * FROM user_tour_states
WHERE tenant_id = $1 AND user_id = $2;

-- name: GetTourState :one
SELECT * FROM user_tour_states
WHERE tenant_id = $1 AND user_id = $2 AND tour_id = $3;
