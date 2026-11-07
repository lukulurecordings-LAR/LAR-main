import { eq, supabaseAdminRequest } from './supabase.js';
export async function hasStudentAccess(userId: string) {
  const result = await supabaseAdminRequest<Array<{ access_starts_at: string | null; access_ends_at: string | null }>>('entitlements', {
    query: `select=access_starts_at,access_ends_at&user_id=${eq(userId)}&status=eq.active&entitlement_key=in.(academy,plan_basic,plan_pro,plan_vip)`,
  });
  if (!result.ok) return null;
  const now = Date.now();
  return result.data.some(row => (!row.access_starts_at || Date.parse(row.access_starts_at) <= now) && (!row.access_ends_at || Date.parse(row.access_ends_at) > now));
}
