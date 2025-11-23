ALTER TABLE enterprise_audit_logs ADD COLUMN IF NOT EXISTS ip INET;
ALTER TABLE enterprise_audit_logs ADD COLUMN IF NOT EXISTS user_agent TEXT;
