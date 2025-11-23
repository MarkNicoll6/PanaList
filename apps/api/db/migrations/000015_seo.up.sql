CREATE TABLE tenant_seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    site_title_pattern TEXT,
    meta_description_pattern TEXT,
    default_og_image_url TEXT,
    canonical_base_url TEXT,
    robots_directives_json JSONB DEFAULT '{}',
    noindex_sections_json JSONB DEFAULT '[]',
    schema_profile TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id)
);

CREATE TABLE seo_topic_clusters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('HUB', 'SPOKE')),
    title TEXT NOT NULL,
    target_keywords TEXT[],
    parent_hub_id UUID REFERENCES seo_topic_clusters(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    metadata_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE seo_health_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    score INTEGER,
    details_json JSONB DEFAULT '{}',
    captured_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tenant_seo_settings_tenant ON tenant_seo_settings(tenant_id);
CREATE INDEX idx_seo_topic_clusters_tenant ON seo_topic_clusters(tenant_id);
CREATE INDEX idx_seo_topic_clusters_slug ON seo_topic_clusters(slug);
CREATE INDEX idx_seo_health_snapshots_tenant ON seo_health_snapshots(tenant_id);
