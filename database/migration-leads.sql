-- PRE Leads Table for AI Chatbot
-- This table stores all leads captured from the website chatbot

CREATE TABLE IF NOT EXISTS pre_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Customer information
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    zip_code VARCHAR(10),

    -- Lead details
    problem TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'PLANLAGT',
    insurance_claim BOOLEAN DEFAULT false,

    -- Conversation
    conversation_log TEXT,

    -- Lead status
    status VARCHAR(20) DEFAULT 'NEW',
    source VARCHAR(50) DEFAULT 'website_chat',

    -- Follow-up tracking
    contacted_at TIMESTAMPTZ,
    contacted_by VARCHAR(100),
    notes TEXT,

    -- Metadata
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_pre_leads_created_at ON pre_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pre_leads_status ON pre_leads(status);
CREATE INDEX IF NOT EXISTS idx_pre_leads_priority ON pre_leads(priority);
CREATE INDEX IF NOT EXISTS idx_pre_leads_phone ON pre_leads(phone);

-- Enable Row Level Security (RLS)
ALTER TABLE pre_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access (for API)
CREATE POLICY "Service role can manage all leads"
    ON pre_leads
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create policy to allow authenticated admin users to view/edit leads
CREATE POLICY "Authenticated users can view leads"
    ON pre_leads
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads"
    ON pre_leads
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pre_leads_updated_at BEFORE UPDATE
    ON pre_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE pre_leads IS 'Stores leads captured from PRE website AI chatbot';
COMMENT ON COLUMN pre_leads.priority IS 'AKUT, HASTER, or PLANLAGT';
COMMENT ON COLUMN pre_leads.status IS 'NEW, CONTACTED, QUALIFIED, WON, LOST';
COMMENT ON COLUMN pre_leads.source IS 'website_chat, phone, email, etc.';
