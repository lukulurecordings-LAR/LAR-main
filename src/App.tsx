import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CheckoutNotice } from './components/CheckoutNotice';
import { HelpAssistant } from './components/HelpAssistant';
import { Navbar } from './components/Navbar';
import { EnquiryPage } from './pages/EnquiryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { StudentLoginPage } from './pages/StudentLoginPage';

function RouteFocus() {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return null;
}

function ApplicationRoutes() {
  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <RouteFocus />
      <Navbar />
      <CheckoutNotice />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<Navigate to="/" replace />} />
          <Route path="/enquire" element={<EnquiryPage />} />
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/student/demo" element={<StudentDashboardPage demoMode />} />
          <Route path="/student/billing" element={<StudentDashboardPage billingFocus />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <HelpAssistant />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  );
}
