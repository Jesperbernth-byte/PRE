-- Site Editor Database Migration
-- Tables for AI-powered site editing system

-- Version tracking table
CREATE TABLE IF NOT EXISTS site_edit_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Version tracking
    version_number INTEGER NOT NULL,
    site_name VARCHAR(50) NOT NULL DEFAULT 'PRE',

    -- Change info
    change_description TEXT NOT NULL,
    change_prompt TEXT,
    changed_by VARCHAR(100),

    -- Git tracking
    commit_sha VARCHAR(40),
    branch_name VARCHAR(100),
    files_changed JSONB,
    change_details JSONB,

    -- Status tracking
    status VARCHAR(20) DEFAULT 'preview',
    preview_url TEXT,
    preview_build_id TEXT,

    -- Deployment
    deployed_at TIMESTAMPTZ,
    deployment_url TEXT,

    -- Rollback
    rolled_back_at TIMESTAMPTZ,
    rolled_back_by VARCHAR(100)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_edit_versions_site ON site_edit_versions(site_name);
CREATE INDEX IF NOT EXISTS idx_site_edit_versions_version ON site_edit_versions(version_number DESC);
CREATE INDEX IF NOT EXISTS idx_site_edit_versions_status ON site_edit_versions(status);

-- Editable content map
CREATE TABLE IF NOT EXISTS editable_content_map (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR(50) NOT NULL,
    content_key VARCHAR(200) NOT NULL,
    file_path TEXT NOT NULL,
    content_type VARCHAR(50),
    current_value TEXT,
    description TEXT,
    is_editable BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint for content keys
CREATE UNIQUE INDEX IF NOT EXISTS idx_editable_content_key
ON editable_content_map(site_name, content_key);

-- Insert initial editable content map for PRE site
INSERT INTO editable_content_map (site_name, content_key, file_path, content_type, description) VALUES
('PRE', 'COMPANY_NAME', 'PRE/constants.tsx', 'text', 'Firmanavn'),
('PRE', 'PHONE_JACOB', 'PRE/constants.tsx', 'text', 'Jacob telefonnummer'),
('PRE', 'PHONE_PREBEN', 'PRE/constants.tsx', 'text', 'Preben telefonnummer'),
('PRE', 'EMAIL', 'PRE/constants.tsx', 'text', 'Email adresse'),
('PRE', 'ADDRESS', 'PRE/constants.tsx', 'text', 'Firmaadresse'),
('PRE', 'PRIMARY_COLOR', 'PRE/index.css', 'color', 'Primær farve (blå)'),
('PRE', 'SECONDARY_COLOR', 'PRE/index.css', 'color', 'Sekundær farve (orange)'),
('PRE', 'SERVICES', 'PRE/constants.tsx', 'array', 'Services liste'),
('PRE', 'TEAM', 'PRE/constants.tsx', 'array', 'Team medlemmer'),
('PRE', 'CERTIFICATIONS', 'PRE/constants.tsx', 'array', 'Certificeringer')
ON CONFLICT (site_name, content_key) DO NOTHING;
