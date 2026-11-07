import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { eq, supabaseAdminRequest } from './_lib/supabase.js';
import { hasStudentAccess } from './_lib/student-access.js';
import { sendJson, type ApiRequest, type ApiResponse } from './_lib/http.js';
export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control','private, no-store');
  const token = req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('__Host-lukulu_lab='))?.split('=')[1];
  if(req.method==='POST') {
    if(token && /^[a-f0-9]{64}$/.test(token)) await supabaseAdminRequest('student_lab_sessions',{method:'PATCH',query:`token_hash=${eq(createHash('sha256').update(token).digest('hex'))}`,body:{expires_at:new Date(0).toISOString()}});
    res.setHeader('Set-Cookie','__Host-lukulu_lab=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
    return sendJson(res,200,{ok:true});
  }
  if(req.method!=='GET')return sendJson(res,405,{error:'Method not allowed.'});
  if(!token || !/^[a-f0-9]{64}$/.test(token)) return sendJson(res,401,{error:'Open the lab from your signed-in student hub.'});
  const session=await supabaseAdminRequest<Array<{user_id:string}>>('student_lab_sessions',{query:`select=user_id&token_hash=${eq(createHash('sha256').update(token).digest('hex'))}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&limit=1`});
  if(!session.ok)return sendJson(res,503,{error:'Student access service is unavailable.'});
  if(!session.data[0] || await hasStudentAccess(session.data[0].user_id)!==true)return sendJson(res,403,{error:'Student access expired. Return to the hub.'});
  const asset=new URL(req.url||'/', 'https://local.invalid').searchParams.get('asset')||'index.html';
  if(!/^(index\.html|assets\/[A-Za-z0-9_.-]+\.(js|css|png|svg|woff2))$/.test(asset))return sendJson(res,404,{error:'Resource not found.'});
  try {
    const root=fileURLToPath(new URL('./_lab-assets/',import.meta.url));
    const body=await readFile(resolve(root,asset));
    const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
    res.setHeader('Content-Type',mime[extname(asset)]||'application/octet-stream');res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('X-Frame-Options','SAMEORIGIN');res.end(body);
  }catch{return sendJson(res,503,{error:'Lab build missing. Contact Academy support.'});}
}
