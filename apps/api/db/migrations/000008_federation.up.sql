CREATE TABLE federation_optin (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL DEFAULT false,
    categories_json JSONB NOT NULL DEFAULT '[]',
    regions_json JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE federation_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL, -- Logical reference to listings table (not FK to allow loose coupling if needed)
    normalized_json JSONB NOT NULL, -- Stores title, description, location for search
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE federation_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT NOT NULL,
    filters_json JSONB NOT NULL DEFAULT '{}',
    results_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_federation_index_tenant ON federation_index(tenant_id);
-- Gin index for JSONB search (simple implementation for now)
CREATE INDEX idx_federation_index_json ON federation_index USING gin (normalized_json);
