CREATE TABLE user_tour_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Assuming user_id is managed by auth system, potentially foreign key if users table exists
    tour_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED')),
    last_step_index INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, user_id, tour_id)
);

CREATE INDEX idx_user_tour_states_user ON user_tour_states(user_id);
CREATE INDEX idx_user_tour_states_tenant ON user_tour_states(tenant_id);
