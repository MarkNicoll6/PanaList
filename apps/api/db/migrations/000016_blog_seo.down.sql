ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_status_check;
DROP INDEX IF EXISTS idx_posts_tenant_status_published;
DROP INDEX IF EXISTS idx_posts_tags;
ALTER TABLE posts DROP COLUMN IF EXISTS og_image_url;
ALTER TABLE posts DROP COLUMN IF EXISTS custom_meta_tags;
ALTER TABLE posts DROP COLUMN IF EXISTS meta_description;
ALTER TABLE posts DROP COLUMN IF EXISTS tags;
ALTER TABLE posts DROP COLUMN IF EXISTS sector;
