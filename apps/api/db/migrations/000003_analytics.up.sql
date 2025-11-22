CREATE TABLE metrics_daily (
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    pageviews INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    outbound_clicks INTEGER DEFAULT 0,
    search_queries_json JSONB DEFAULT '[]',
    PRIMARY KEY (tenant_id, date)
);

CREATE TABLE listing_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    event TEXT NOT NULL, -- view, click, contact
    meta_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_listing_events_tenant_date ON listing_events(tenant_id, created_at);
CREATE INDEX idx_listing_events_listing ON listing_events(listing_id);
