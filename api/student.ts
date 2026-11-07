import { randomBytes, createHash } from 'node:crypto';
import { requireMethod, sendJson, type ApiRequest, type ApiResponse } from './_lib/http.js';
import { supabaseAdminRequest, verifySupabaseUser } from './_lib/supabase.js';
import { hasStudentAccess } from './_lib/student-access.js';
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, 'POST')) return;
  const auth = await verifySupabaseUser(req);
  if (auth.status !== 'verified') return sendJson(res, auth.status === 'setup-required' ? 503 : 401, { error: 'Student sign-in required.' });
  const access = await hasStudentAccess(auth.user.id);
  if (access !== true) return sendJson(res, access === null ? 503 : 403, { error: access === null ? 'Student access service is unavailable.' : 'Your Academy enrolment needs activation. Please contact support.' });
  const token = randomBytes(32).toString('hex');
  const session = await supabaseAdminRequest('student_lab_sessions', {method:'POST', body:{user_id:auth.user.id, token_hash:createHash('sha256').update(token).digest('hex'), expires_at:new Date(Date.now()+15*60*1000).toISOString()}});
  if(!session.ok) return sendJson(res,503,{error:'Student hub setup is incomplete. Contact Academy support.'});
  res.setHeader('Set-Cookie', `__Host-lukulu_lab=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900`);
  return sendJson(res,200,{email:auth.user.email, expiresIn:900, subjects:[
    {course:'Music Production',subjects:['Production foundations','Rhythm & drums','Chords, melody & bass','Recording & sampling','Arrangement','Mixing & export']},
    {course:'Music Business',subjects:['Copyright & splits','Royalties & registrations','Metadata & distribution','Licensing','Release planning']}
  ]});
}
