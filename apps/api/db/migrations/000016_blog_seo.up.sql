ALTER TABLE posts ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'::TEXT[];
ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS custom_meta_tags TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_image_url TEXT;

-- Add check constraint for status if it doesn't exist (dropping first to be safe if we want to enforce specific values)
-- For now, just ensuring the column exists and has the right default.
-- We can add a check constraint:
ALTER TABLE posts ADD CONSTRAINT posts_status_check CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'draft', 'published', 'archived'));

CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_posts_tenant_status_published ON posts(tenant_id, status, published_at);
