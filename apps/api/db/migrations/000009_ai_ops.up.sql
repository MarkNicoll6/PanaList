CREATE TABLE ops_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'broken_link', 'stale_content', 'gap_analysis'
    entity TEXT NOT NULL, -- 'listing', 'post'
    entity_id UUID NOT NULL,
    severity TEXT NOT NULL, -- 'low', 'medium', 'high'
    details_json JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'open', -- 'open', 'resolved', 'ignored'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE trend_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    category_id UUID NOT NULL, -- Can be null if global trend, but schema says tenant scoped
    score FLOAT NOT NULL,
    evidence_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ops_findings_tenant ON ops_findings(tenant_id);
CREATE INDEX idx_trend_signals_tenant ON trend_signals(tenant_id);
