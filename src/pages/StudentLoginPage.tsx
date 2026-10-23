import { useState, type FormEvent } from 'react';
import {
  AlertCircleIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  GraduationCapIcon,
  LoaderCircleIcon,
  LockKeyholeIcon,
  EyeIcon,
  MailIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocumentTitle } from '../components/DocumentTitle';
import { Footer } from '../components/Footer';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');

function getStudentRedirectUrl() {
  const origin = publicSiteUrl || window.location.origin;
  return `${origin}/student`;
}

export function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'pending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const sendSignInLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || state === 'pending') return;
    setState('pending');
    setMessage('');

    try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: getStudentRedirectUrl(),
        shouldCreateUser: false,
      },
    });

    if (error) {
      setState('error');
      setMessage(
        /signups|user not found|invalid/i.test(error.message)
          ? 'We could not find an enrolled student account for that email. Contact Academy support if your enrolment should be active.'
          : 'The sign-in link could not be sent. Please try again or contact Academy support.',
      );
      return;
    }

    setState('sent');
    setMessage('If this email belongs to an enrolled student, a secure sign-in link will arrive shortly.');
    } catch {
      setState('error');
      setMessage('We could not reach the sign-in service. Check your connection and try again.');
    }
  };

  return (
    <>
      <DocumentTitle title="Student Login" description="Sign in to your private Lukulu Academy student account." noIndex />
      <section className="auth-page signal-section" aria-labelledby="student-login-title">
        <div className="page-shell auth-layout">
          <aside className="auth-brand">
            <picture>
              <source srcSet="/lar-brand-mark.webp" type="image/webp" />
              <img src="/lar-brand-mark.png" alt="Lukulu Academy & Recordings" width="768" height="768" />
            </picture>
            <div><p className="console-label">ENROLLED STUDENT ACCESS</p><strong>Learn. Build. Release.</strong></div>
          </aside>

          <div className="auth-console">
            <p className="signal-label"><span>01</span><span>Student channel</span></p>
            <GraduationCapIcon className="auth-console__icon" aria-hidden="true" />
            <h1 id="student-login-title">Student login</h1>
            <p>Enter the email used for your enrolment. We will send a one-time sign-in link—no password needed.</p>

            {!isSupabaseConfigured ? (
              <div className="status-panel status-panel--warning auth-setup">
                <AlertCircleIcon aria-hidden="true" />
                <div>
                  <strong>Student sign-in is being connected</strong>
                  <p>The secure login service is not configured on this site yet. No account has been created and no login was attempted.</p>
                  <Link to="/enquire?category=academy&service=billing-help"><MailIcon aria-hidden="true" /> Contact Academy support</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={sendSignInLink}>
                <label>
                  <span>Email address</span>
                  <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setState('idle'); }} autoComplete="email" required placeholder="student@example.com" />
                </label>
                <button type="submit" className="button button-primary button-full" disabled={state === 'pending'}>
                  {state === 'pending' ? <LoaderCircleIcon className="spin" aria-hidden="true" /> : <LockKeyholeIcon aria-hidden="true" />}
                  {state === 'pending' ? 'Sending secure link…' : 'Email me a sign-in link'}
                </button>
                <div aria-live="polite">
                  {state === 'sent' && <div className="status-panel status-panel--success"><CheckCircle2Icon aria-hidden="true" /><div><strong>Link sent</strong><p>{message}</p></div></div>}
                  {state === 'error' && <div className="status-panel status-panel--error"><AlertCircleIcon aria-hidden="true" /><div><strong>Sign-in unavailable</strong><p>{message}</p><Link to="/enquire?category=academy&service=course-advice">Get enrolment help <ArrowRightIcon aria-hidden="true" /></Link></div></div>}
                </div>
              </form>
            )}

            <div className="demo-login-entry">
              <div><EyeIcon aria-hidden="true" /><span><strong>Preview before enrolling</strong><small>Explore the full student portal with safe sample data.</small></span></div>
              <Link className="button button-quiet button-full" to="/student/demo">Enter demo portal <ArrowRightIcon aria-hidden="true" /></Link>
            </div>

            <div className="auth-console__foot">
              <p><LockKeyholeIcon aria-hidden="true" /> Student access is verified after sign-in.</p>
              <Link to="/student">Already signed in? Open dashboard <ArrowRightIcon aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
