CREATE TABLE themes_market (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    thumb_url TEXT,
    price_cents INTEGER DEFAULT 0,
    metadata_json JSONB DEFAULT '{}',
    status TEXT DEFAULT 'draft', -- draft, published
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blocks_market (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    price_cents INTEGER DEFAULT 0,
    schema_json JSONB DEFAULT '{}',
    bundle_url TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tenant_installs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL, -- theme, block
    item_id UUID NOT NULL,
    version TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
