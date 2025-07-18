-- Create the api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  key VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'development',
  permissions TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active',
  limit INTEGER,
  limit_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE
);

-- Create an index on the key column for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);

-- Create an index on the status column
CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);

-- Enable Row Level Security (RLS)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can modify this based on your needs)
CREATE POLICY "Allow all operations on api_keys" ON api_keys
  FOR ALL USING (true); 