CREATE TABLE sso_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'saml', 'oidc'
    domain TEXT NOT NULL, -- e.g. 'acme.com'
    metadata_url TEXT, -- For SAML
    client_id TEXT, -- For OIDC
    client_secret TEXT, -- For OIDC
    enabled BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE scim_directories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    token TEXT NOT NULL, -- Bearer token for SCIM client
    enabled BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assuming audit_logs might already exist or we use a simple one for now
CREATE TABLE IF NOT EXISTS enterprise_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    actor_id UUID, -- User who performed action
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    details_json JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sso_providers_tenant ON sso_providers(tenant_id);
CREATE INDEX idx_scim_directories_tenant ON scim_directories(tenant_id);
CREATE INDEX idx_enterprise_audit_logs_tenant ON enterprise_audit_logs(tenant_id);
