// Deprecated: the old "apply" endpoint pushed Gemini-generated code
// straight to main without preview. Sprint B replaced it with a
// two-step flow:
//
//   1. POST /api/site-editor/preview   → generate code, store in DB
//   2. POST /api/site-editor/deploy    → push stored version to main
//
// This stub remains to surface a clear error if anything still calls it.

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(410).json({
    success: false,
    message: '/api/site-editor/apply er udfaset. Brug nu preview-flowet: kald /api/site-editor/preview først og derefter /api/site-editor/deploy med versionId.'
  });
}
