import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { DocumentTitle } from '../components/DocumentTitle';
import type { Session } from '@supabase/supabase-js';
type Course = {course:string;subjects:string[]};
export function StudentDashboardPage({demoMode=false, billingFocus=false}:{demoMode?:boolean;billingFocus?:boolean}) {
  const [session,setSession]=useState<Session|null>(null);
  const [loading,setLoading]=useState(true);
  const [courses,setCourses]=useState<Course[]>([]);
  const [error,setError]=useState('');
  const [lab,setLab]=useState(false);
  const [ready,setReady]=useState(false);
  const [retry,setRetry]=useState(0);
  const [billing,setBilling]=useState(false);
  const [billingError,setBillingError]=useState('');
  useEffect(()=>{
    if(!supabase){setLoading(false);return;}
    let active=true;
    supabase.auth.getSession().then(({data,error})=>{if(active){setSession(data.session);setLoading(false);if(error)setError('Unable to check your session. Please sign in again.');}}).catch(()=>{if(active){setLoading(false);setError('Unable to check your session.');}});
    const {data}=supabase.auth.onAuthStateChange((_event,value)=>{if(active){setSession(value);setLoading(false);if(!value){setReady(false);setLab(false);}}});
    return()=>{active=false;data.subscription.unsubscribe();};
  },[]);
  useEffect(()=>{
    if(!session)return;
    const controller=new AbortController();let busy=false;
    async function load(){
      if(busy)return;busy=true;
      try{const current=await supabase!.auth.getSession();
        if(!current.data.session)throw Error('Your sign-in session expired. Please sign in again.');
        const response=await fetch('/api/student',{method:'POST',headers:{Authorization:`Bearer ${current.data.session.access_token}`},signal:AbortSignal.any([controller.signal,AbortSignal.timeout(15000)])});
        const data=await response.json();if(!response.ok)throw Error(data.error||'Student access is unavailable.');
        if(!controller.signal.aborted){setCourses(data.subjects);setReady(true);setError('');}
      }catch(e){if(!controller.signal.aborted){setReady(false);setLab(false);setError(e instanceof Error?e.message:'Student access unavailable.');}}finally{busy=false;}
    }
    void load();const timer=setInterval(()=>void load(),12*60*1000);
    const refresh=()=>{if(document.visibilityState==='visible')void load();};
    document.addEventListener('visibilitychange',refresh);
    return()=>{controller.abort();clearInterval(timer);document.removeEventListener('visibilitychange',refresh);};
  },[session,retry]);
  async function logout(){setLab(false);setReady(false);await fetch('/api/lab',{method:'POST'}).catch(()=>{});await supabase?.auth.signOut();setSession(null);}
  async function openBilling(){if(!session)return;setBilling(true);setBillingError('');try{const response=await fetch('/api/billing-portal',{method:'POST',headers:{Authorization:`Bearer ${session.access_token}`}});const data=await response.json();if(!response.ok||typeof data.url!=='string'||!data.url.startsWith('https://billing.stripe.com/'))throw Error('Billing is not available. Contact Academy support.');window.location.assign(data.url);}catch(e){setBillingError(e instanceof Error?e.message:'Billing unavailable.');}finally{setBilling(false);}}
  if(demoMode)return <Navigate to="/student/login" replace />;
  if(!loading&&!session&&supabase)return <Navigate to="/student/login" replace />;
  return <section className="student-page section-pad"><DocumentTitle title="Student Hub" description="Private Academy courses and DAW learning lab." noIndex/><div className="page-shell">
    <header className="student-page__head"><div><p className="console-label">LUKULU ACADEMY</p><h1>Student hub</h1><p>{session?.user.email||'Private student learning'}</p></div>{session&&<button className="button button-quiet" onClick={()=>void logout()}>Sign out</button>}</header>
    {!supabase?<div role="status"><h2>Student login needs configuration</h2><p>Academy support must connect the secure login service before student access is available.</p><Link to="/enquire?category=academy&service=course-advice">Contact support</Link></div>:loading?<p role="status">Checking your session…</p>:<>
    {error&&<div role="alert" className="status-panel status-panel--error"><p>{error}</p><button onClick={()=>setRetry(x=>x+1)}>Try again</button><Link to="/enquire?category=academy&service=course-advice">Enrolment support</Link></div>}
    {session&&!ready&&!error&&<p role="status">Verifying your Academy access…</p>}
    {ready&&<><div className="hero-actions"><button className="button button-primary" onClick={()=>setLab(x=>!x)}>{lab?'Close practice lab':'Open DAW learning lab'}</button><button className="button button-quiet" disabled={billing} onClick={()=>void openBilling()}>{billing?'Opening billing…':'Manage billing'}</button></div>
    {billingError&&<p role="alert">{billingError}</p>}
    {billingFocus&&<p>Use Manage billing for your hosted billing account. Access depends on your enrolment and billing configuration.</p>}
    {lab&&<div style={{marginBlock:'2rem'}}><h2>DAW learning lab</h2><p>Use headphones at a comfortable volume. Practice progress in the current lab is saved on this browser, not your Academy account.</p><iframe title="Lukulu DAW Learning Lab" src="/student-lab/index.html#/simulator" style={{width:'100%',height:'80vh',border:'1px solid #66584c'}} allow="autoplay"/><p>Returning after a break? Renew access if the lab has expired. Unsaved lab work may be lost when reloading.</p><button className="button button-quiet" onClick={()=>{setLab(false);setRetry(x=>x+1);}}>Renew lab access</button></div>}
    <div className="academy-hub-courses">{courses.map(course=><article key={course.course}><h2>{course.course}</h2><p>Your subject overview. Full lesson videos and assignments will appear as the Academy publishes them.</p>{course.subjects.map((subject,index)=><details key={subject}><summary>{String(index+1).padStart(2,'0')} · {subject}</summary><p>Study the concept, practise it on a small project, and note questions for your instructor.</p><p>{course.course==='Music Production'?'Practice: create a short idea in the learning lab. Save your project before leaving.':'Practice: write a short checklist showing how this subject applies to one of your songs.'}</p></details>)}</article>)}</div></>}
    </>}
  </div></section>;
}
