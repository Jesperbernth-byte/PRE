import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { siteName = 'PRE', limit = 50 } = req.query;

  try {
    // Get version history from database
    const { data: versions, error } = await supabase
      .from('site_edit_versions')
      .select('*')
      .eq('site_name', siteName)
      .order('version_number', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      throw new Error('Kunne ikke hente historik fra database');
    }

    return res.status(200).json({
      success: true,
      versions: versions || [],
      total: versions?.length || 0
    });

  } catch (error) {
    console.error('History Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved hentning af historik',
      error: error.message
    });
  }
}
