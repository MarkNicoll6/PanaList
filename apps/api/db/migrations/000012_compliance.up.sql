CREATE TABLE compliance_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Nullable for global scans
    status TEXT NOT NULL, -- 'running', 'completed', 'failed'
    summary_json JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE compliance_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    scan_id UUID REFERENCES compliance_scans(id) ON DELETE SET NULL,
    category TEXT NOT NULL, -- 'dns', 'auth', 'encryption', etc.
    severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open', -- 'open', 'resolved', 'ignored'
    detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE evidence_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Nullable for multi-tenant bundles
    template TEXT NOT NULL,
    format TEXT NOT NULL, -- 'pdf', 'json', 'zip'
    status TEXT NOT NULL, -- 'generating', 'completed', 'failed'
    download_url TEXT,
    created_by UUID, -- User ID
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rbac_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rbac_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES rbac_roles(id) ON DELETE CASCADE,
    resource TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(role_id, resource, action)
);

CREATE INDEX idx_compliance_issues_tenant ON compliance_issues(tenant_id);
CREATE INDEX idx_evidence_exports_tenant ON evidence_exports(tenant_id);
