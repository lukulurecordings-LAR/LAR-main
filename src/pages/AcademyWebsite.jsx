// Consolidated website component recovered from the approved HTML design.
import React from "react";
import "./academy-website.css";
export function AcademyWebsite() {
    const [course, setCourse] = React.useState('Music Production');
    const [software, setSoftware] = React.useState('FL Studio');
    const [studio, setStudio] = React.useState('No preference');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [selectedPlan, setSelectedPlan] = React.useState('Help me choose');
    const [reviewing, setReviewing] = React.useState(false);
    const [audioStatus, setAudioStatus] = React.useState('');
    const menuRef = React.useRef(null);
    const nameRef = React.useRef(null);
    const [activePad, setActivePad] = React.useState('');
    const audioRef = React.useRef(null);
    const formRef = React.useRef(null);
    function goToApply() { document.getElementById('apply')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); nameRef.current?.focus({ preventScroll: true }); }
    function choose(value) { setCourse(value); setReviewing(false); goToApply(); }
    function closeMenu(event) { if (event.target.closest('a') && menuRef.current)
        menuRef.current.open = false; }
    React.useEffect(() => { function escape(event) { if (event.key === 'Escape' && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector('summary')?.focus();
    } } document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape); }, []);
    function draft() { return `Hello Lukulu Academy, I would like to apply.\nName: ${name.trim()}\nEmail: ${email.trim()}\nCourse: ${course}\nPlan enquiry: ${selectedPlan}\n${course === 'Music Production' ? `Software: ${software}\nStudio preference: ${studio}\n` : ''}Learning goal: ${goal.trim() || 'Please help me choose a starting point.'}`; }
    function submit(event) { event.preventDefault(); setReviewing(true); setStatus('Review your application below. Nothing has been sent.'); }
    function downloadDraft() { const blob = new Blob([draft()], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Lukulu-Academy-Application.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setStatus('Application downloaded to your device. Nothing has been sent.'); }
    async function copy() { if (!formRef.current?.reportValidity())
        return; try {
        await navigator.clipboard.writeText(draft());
        setStatus('Application copied. Paste it into your preferred message app to send.');
    }
    catch {
        setReviewing(true);
        setStatus('Clipboard unavailable. Select the text in the review box or download your draft.');
    } }
    function play(kind) { try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx)
            throw new Error();
        const ctx = audioRef.current || (audioRef.current = new Ctx());
        if (ctx.state === 'suspended')
            ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const tones = { Kick: [145, 48, .35], Bass: [110, 55, .6], Chord: [261.63, 261.63, .8], Pluck: [440, 330, .35] };
        const [start, end, duration] = tones[kind];
        osc.type = kind === 'Bass' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(start, now);
        osc.frequency.exponentialRampToValueAtTime(end, now + duration);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(.22, now + .012);
        gain.gain.exponentialRampToValueAtTime(.001, now + duration);
        osc.start(now);
        osc.stop(now + duration + .02);
        setAudioStatus(`Playing ${kind.toLowerCase()} sound.`);
        setActivePad(kind);
        setTimeout(() => setActivePad(''), 400);
    }
    catch {
        setAudioStatus('Audio preview is unavailable in this browser. Please try opening this file in Chrome or another browser.');
    } }
    const subjects = ['Production foundations', 'Drums, rhythm & beat making', 'Chords, melody & bass', 'Recording, sampling & sound design', 'Arrangement & automation', 'Mixing, mastering & exporting'];
    const business = ['Music industry foundations', 'Copyright, ownership & split sheets', 'Royalties & registrations', 'Metadata & distribution', 'Beat licensing & agreements', 'Release planning & promotion'];
    return React.createElement("div", { className: "lc-app" },
        React.createElement("a", { href: "#main-content", className: "lc-skip" }, "Skip to content"),
        React.createElement("div", { className: "lc-top" }, "SOUTH AFRICAN ROOTS. LEARNING WITHOUT BORDERS."),
        React.createElement("header", { className: "lc-nav lc-shell" },
            React.createElement("a", { className: "lc-brand", href: "#home" },
                React.createElement("strong", null,
                    "LUKULU ",
                    React.createElement("small", null, "ACADEMY")),
                React.createElement("span", null, "MUSIC EDUCATION \u00B7 SOUTH AFRICA")),
            React.createElement("nav", { "aria-label": "Main navigation" },
                React.createElement("a", { href: "#courses" }, "Courses"),
                React.createElement("a", { href: "#how" }, "How it works"),
                React.createElement("a", { href: "#pricing" }, "Pricing"),
                React.createElement("a", { href: "/student/login" }, "Student portal \u2197")),
            React.createElement("a", { className: "lc-button lc-button-dark lc-nav-apply", href: "#apply" }, "Apply now \u2197"),
            React.createElement("details", { className: "lc-mobile", ref: menuRef, onClick: closeMenu },
                React.createElement("summary", null, "Menu"),
                React.createElement("nav", { "aria-label": "Mobile navigation" },
                    React.createElement("a", { href: "#courses" }, "Courses"),
                    React.createElement("a", { href: "#how" }, "How it works"),
                    React.createElement("a", { href: "#pricing" }, "Pricing"),
                    React.createElement("a", { href: "#apply" }, "Apply now"),
                    React.createElement("a", { href: "/student/login" }, "Student portal \u2197")))),
        React.createElement("main", { id: "main-content", tabIndex: -1 },
            React.createElement("section", { id: "home", className: "lc-hero lc-shell" },
                React.createElement("span", { className: "lc-pill" },
                    React.createElement("i", null),
                    " AFRO HOUSE CULTURE. BUILT FOR EDUCATION."),
                React.createElement("h1", null,
                    "MAKE MUSIC.",
                    React.createElement("br", null),
                    React.createElement("span", null, "BUILD YOUR FUTURE.")),
                React.createElement("p", null,
                    "Music Production and Music Business, made approachable.",
                    React.createElement("br", { className: "lc-desktop" }),
                    " Learn remotely, at your pace, wherever life takes you."),
                React.createElement("div", { className: "lc-actions" },
                    React.createElement("a", { className: "lc-button lc-button-dark", href: "#courses" }, "Explore the courses \u2193"),
                    React.createElement("a", { className: "lc-button lc-button-outline", href: "#apply" }, "Join the Academy \u2197")),
                React.createElement("div", { className: "lc-hero-notes" },
                    React.createElement("span", null, "Two focused courses"),
                    React.createElement("span", null, "Flexible learning"),
                    React.createElement("span", null, "Practical skills"))),
            React.createElement("section", { id: "courses", className: "lc-section lc-shell" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "01 / OUR COURSES"),
                    React.createElement("h2", null,
                        "ONE ACADEMY.",
                        React.createElement("br", null),
                        "TWO WAYS TO GROW."),
                    React.createElement("p", null, "Learn to create your sound. Understand the business behind it.")),
                React.createElement("div", { className: "lc-course-grid" },
                    React.createElement("article", { className: "lc-card" },
                        React.createElement("div", { className: "lc-card-top" },
                            React.createElement("span", { className: "lc-icon lc-orange" }, "\u266B"),
                            React.createElement("span", { className: "lc-kicker" }, "CREATE YOUR SOUND"),
                            React.createElement("span", { className: "lc-number" }, "01")),
                        React.createElement("h3", null, "Music Production"),
                        React.createElement("p", null, "From a first beat to a finished track. Learn the core skills through your preferred software, with an approach rooted in Afro House culture."),
                        React.createElement("label", { className: "lc-label" },
                            "Choose your software",
                            React.createElement("select", { value: software, onChange: e => setSoftware(e.target.value) }, ['FL Studio', 'Cubase', 'Reason', 'Not sure yet'].map(x => React.createElement("option", { key: x }, x)))),
                        React.createElement("p", { className: "lc-small" }, "FL Studio \u00B7 Cubase \u00B7 Reason. Same foundations, different tools."),
                        React.createElement("details", { className: "lc-subjects" },
                            React.createElement("summary", null,
                                "Explore the subjects ",
                                React.createElement("span", null, "+")),
                            React.createElement("ul", null, subjects.map(x => React.createElement("li", { key: x }, x)))),
                        React.createElement("div", { className: "lc-outcome" },
                            React.createElement("span", { className: "lc-kicker" }, "WORK TOWARDS"),
                            React.createElement("p", null, "A complete track, an organised project and export-ready audio.")),
                        React.createElement("button", { className: "lc-button lc-button-dark", onClick: () => choose('Music Production') }, "Apply for Music Production \u2197")),
                    React.createElement("article", { className: "lc-card" },
                        React.createElement("div", { className: "lc-card-top" },
                            React.createElement("span", { className: "lc-icon lc-gold" }, "\u2197"),
                            React.createElement("span", { className: "lc-kicker" }, "KNOW YOUR BUSINESS"),
                            React.createElement("span", { className: "lc-number" }, "02")),
                        React.createElement("h3", null, "Music Business"),
                        React.createElement("p", null, "Understand your rights, organise your music and plan your releases. Build practical knowledge for an independent music career."),
                        React.createElement("div", { className: "lc-callout" },
                            React.createElement("span", { className: "lc-kicker" }, "FOR ARTISTS, PRODUCERS & DJs"),
                            React.createElement("p", null, "Start with the essentials. Apply what you learn to your own music.")),
                        React.createElement("details", { className: "lc-subjects" },
                            React.createElement("summary", null,
                                "Explore the subjects ",
                                React.createElement("span", null, "+")),
                            React.createElement("ul", null, business.map(x => React.createElement("li", { key: x }, x)))),
                        React.createElement("div", { className: "lc-outcome" },
                            React.createElement("span", { className: "lc-kicker" }, "WORK TOWARDS"),
                            React.createElement("p", null, "Clear credits, organised metadata and a practical release plan.")),
                        React.createElement("button", { className: "lc-button lc-button-outline", onClick: () => choose('Music Business') }, "Apply for Music Business \u2197"))),
                React.createElement("details", { className: "lc-studios" },
                    React.createElement("summary", null,
                        "Prefer a production workflow? Explore Eiffel & Apple Studio ",
                        React.createElement("span", null, "+")),
                    React.createElement("div", { className: "lc-studio-grid" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "lc-pill" }, "EIFFEL STUDIO"),
                            React.createElement("h3", null, "Rhythm. Texture. Groove."),
                            React.createElement("p", null, "Explore the production approach built around FL Studio, Cubase and Reason.")),
                        React.createElement("div", null,
                            React.createElement("span", { className: "lc-pill" }, "APPLE STUDIO"),
                            React.createElement("h3", null, "Melody. Vocals. Polish."),
                            React.createElement("p", null, "A Logic Pro and GarageBand workflow preference. Ask about availability when applying."))),
                    React.createElement("p", { className: "lc-small" }, "Studio preferences are optional. Your course, requirements and available support are confirmed before enrolment."))),
            React.createElement("section", { id: "how", className: "lc-dark lc-section" },
                React.createElement("div", { className: "lc-shell" },
                    React.createElement("header", { className: "lc-section-head" },
                        React.createElement("p", { className: "lc-kicker" }, "02 / MADE TO FIT YOUR LIFE"),
                        React.createElement("h2", null,
                            "YOUR PLACE.",
                            React.createElement("br", null),
                            "YOUR PACE."),
                        React.createElement("p", null, "A simple start, clear resources and room to practise in your own time.")),
                    React.createElement("div", { className: "lc-how-grid" }, [{ n: '01', title: 'Enrol simply', text: 'Choose your course and send a short application. We confirm your fees, access and next steps.' }, { n: '02', title: 'Bring the essentials', text: 'An email address and internet access. Read notes on your phone; use a computer, headphones and your chosen software for production exercises.' }, { n: '03', title: 'Learn around your life', text: 'Study remotely around work and home. Revisit notes, check your understanding and practise one subject at a time.' }].map(x => React.createElement("article", { key: x.n },
                        React.createElement("span", { className: "lc-number" }, x.n),
                        React.createElement("h3", null, x.title),
                        React.createElement("p", null, x.text)))),
                    React.createElement("div", { className: "lc-practice" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "lc-pill" }, "PRACTICE AT YOUR CONVENIENCE"),
                            React.createElement("h3", null,
                                "Hear an idea.",
                                React.createElement("br", null),
                                "Try it yourself."),
                            React.createElement("p", null, "Explore this simple browser sound demo. Our full DAW simulator is in development to support more hands-on practice alongside notes, quizzes and production exercises."),
                            React.createElement("span", { className: "lc-status" }, "Full DAW simulator \u00B7 In development")),
                        React.createElement("div", { className: "lc-pads" },
                            React.createElement("p", { className: "lc-kicker" }, "SOUND DEMO \u00B7 TAP TO LISTEN"),
                            React.createElement("div", null, ['Kick', 'Bass', 'Chord', 'Pluck'].map((x, i) => React.createElement("button", { "aria-label": `Play ${x.toLowerCase()} tone`, className: activePad === x ? 'is-playing' : '', onClick: () => play(x), key: x },
                                React.createElement("span", { className: 'lc-pad-dot lc-pad-' + i }),
                                React.createElement("strong", null, x),
                                React.createElement("span", null, "Synthesised tone \u2197")))),
                            React.createElement("p", { className: "lc-small" }, "A small audio demonstration, not the full DAW simulator."),
                            React.createElement("p", { className: "lc-small", role: "status" }, audioStatus))))),
            React.createElement("section", { id: "pricing", className: "lc-section lc-shell" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "03 / MEMBERSHIP OPTIONS \u00B7 ZAR"),
                    React.createElement("h2", null,
                        "START SMALL.",
                        React.createElement("br", null),
                        "KEEP GROWING."),
                    React.createElement("p", null, "Explore the current plan guide. We confirm fees, course access and support before payment.")),
                React.createElement("div", { className: "lc-price-grid" }, [{ name: 'Free', price: 'R0', desc: 'Explore introductory learning.', features: ['Course introductions', 'Simple browser sound demo'], cta: 'Ask about previews' }, { name: 'Basic', price: 'R149', desc: 'Build your foundations.', features: ['Beginner learning pathway', 'Learning resources'], cta: 'Ask about Basic' }, { name: 'Pro', price: 'R349', desc: 'Develop your skills further.', features: ['Broader course access', 'Feedback options'], cta: 'Ask about Pro' }, { name: 'VIP', price: 'R999', desc: 'Ask about individual support.', features: ['Mentorship options', 'Personal learning guidance'], cta: 'Ask about VIP' }].map(x => React.createElement("article", { className: 'lc-price ' + (x.name === 'Pro' ? 'lc-price-featured' : ''), key: x.name },
                    React.createElement("p", { className: "lc-kicker" },
                        x.name,
                        x.name === 'Pro' ? ' / GROW YOUR SKILLS' : ''),
                    React.createElement("h3", null,
                        x.price,
                        React.createElement("small", null, x.name === 'Free' ? ' / preview' : ' / month')),
                    React.createElement("p", null, x.desc),
                    React.createElement("ul", null, x.features.map(y => React.createElement("li", { key: y }, y))),
                    React.createElement("button", { className: 'lc-button ' + (x.name === 'Pro' ? 'lc-button-light' : 'lc-button-dark'), onClick: () => { setSelectedPlan(x.name); setReviewing(false); goToApply(); } },
                        x.cta,
                        " \u2197")))),
                React.createElement("p", { className: "lc-small lc-center" }, "Plan guide carried forward from this design. Fees and benefits are subject to confirmation. No payment is taken here.")),
            React.createElement("section", { id: "questions", className: "lc-section lc-shell lc-faq" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "BEFORE YOU START"),
                    React.createElement("h2", null, "A FEW SIMPLE ANSWERS.")),
                [
                    ['Do I need experience?', 'You can start with the foundations. Tell us your experience when applying so we can suggest a suitable starting point.'],
                    ['Can I learn on my phone?', 'Use your phone for reading and reviewing notes. Practical production exercises need computer access, headphones and your chosen software.'],
                    ['Do I need to choose a studio?', 'No. Eiffel and Apple are optional workflow preferences. Choose your course first; we can help you work out the tools.'],
                    ['Is the full simulator available?', 'This page includes a small sound demo. The full DAW simulator is still in development.'],
                    ['Does applying take payment?', 'No. An application starts a conversation. We confirm the course, fees, access and available support before payment.'],
                    ['Can I learn around work?', 'The Academy approach is remote and self-paced. Confirm any scheduled sessions and support times before enrolling.']
                ].map(([question, answer]) => React.createElement("details", { key: question },
                    React.createElement("summary", null,
                        question,
                        React.createElement("span", { "aria-hidden": "true" }, "+")),
                    React.createElement("p", null, answer)))),
            React.createElement("section", { id: "apply", className: "lc-dark lc-section" },
                React.createElement("div", { className: "lc-shell lc-apply-grid" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "lc-kicker" }, "04 / JOIN THE ACADEMY"),
                        React.createElement("h2", null,
                            "READY TO",
                            React.createElement("br", null),
                            "GET LEARNING?"),
                        React.createElement("p", null, "Tell us what interests you. We will help you choose a starting point and confirm the details."),
                        React.createElement("p", { className: "lc-small" }, "Your application stays on this page until you choose to copy it or open WhatsApp. Review and send it there to submit."),
                        React.createElement("a", { className: "lc-text-link", href: "/student/login" }, "Already enrolled? Student portal \u2197")),
                    React.createElement("form", { ref: formRef, onSubmit: submit, onChange: () => { setReviewing(false); setStatus(''); }, className: "lc-application" },
                        React.createElement("label", { className: "lc-label" },
                            "Your name",
                            React.createElement("input", { ref: nameRef, name: "studentName", maxLength: 100, autoComplete: "name", required: true, pattern: ".*\\S.*", value: name, onChange: e => setName(e.target.value) })),
                        React.createElement("label", { className: "lc-label" },
                            "Email address",
                            React.createElement("input", { name: "email", maxLength: 254, autoComplete: "email", type: "email", required: true, value: email, onChange: e => setEmail(e.target.value) })),
                        React.createElement("label", { className: "lc-label" },
                            "Plan enquiry",
                            React.createElement("select", { value: selectedPlan, onChange: e => { setSelectedPlan(e.target.value); setReviewing(false); } }, ['Help me choose', 'Free', 'Basic', 'Pro', 'VIP'].map(x => React.createElement("option", { key: x }, x)))),
                        React.createElement("label", { className: "lc-label" },
                            "Course",
                            React.createElement("select", { value: course, onChange: e => setCourse(e.target.value) },
                                React.createElement("option", null, "Music Production"),
                                React.createElement("option", null, "Music Business"),
                                React.createElement("option", null, "Help me choose"))),
                        course === 'Music Production' && React.createElement("details", { className: "lc-preferences" },
                            React.createElement("summary", null, "Software & studio preference (optional)"),
                            React.createElement("label", { className: "lc-label" },
                                "Software",
                                React.createElement("select", { value: software, onChange: e => setSoftware(e.target.value) }, ['FL Studio', 'Cubase', 'Reason', 'Logic Pro', 'GarageBand', 'Not sure yet'].map(x => React.createElement("option", { key: x }, x)))),
                            React.createElement("label", { className: "lc-label" },
                                "Studio preference",
                                React.createElement("select", { value: studio, onChange: e => setStudio(e.target.value) },
                                    React.createElement("option", null, "No preference"),
                                    React.createElement("option", null, "Eiffel Studio"),
                                    React.createElement("option", null, "Apple Studio")))),
                        React.createElement("label", { className: "lc-label" },
                            "What would you like to learn? (optional)",
                            React.createElement("textarea", { maxLength: 1500, value: goal, onChange: e => setGoal(e.target.value), placeholder: "Your first beat, finishing a track, understanding royalties\u2026" })),
                        React.createElement("button", { className: "lc-button lc-button-gold", type: "submit" }, "Review my application \u2192"),
                        React.createElement("button", { className: "lc-button lc-button-light", type: "button", onClick: copy }, "Copy application"),
                        React.createElement("p", { role: "status", className: "lc-small" }, status),
                        reviewing && React.createElement("div", { className: "lc-review" },
                            React.createElement("h3", null, "Check your application"),
                            React.createElement("p", { className: "lc-small" }, "Review these details before sharing. WhatsApp receives them only when you open the draft below; press Send in WhatsApp to submit."),
                            React.createElement("textarea", { "aria-label": "Application draft", readOnly: true, value: draft(), rows: 9 }),
                            React.createElement("a", { className: "lc-button lc-button-gold", href: `https://wa.me/27730933554?text=${encodeURIComponent(draft())}`, target: "_blank", rel: "noopener noreferrer" }, "Open WhatsApp draft \u2197"),
                            React.createElement("button", { className: "lc-button lc-button-light", type: "button", onClick: downloadDraft }, "Download draft (.txt)")))))),
        React.createElement("footer", { className: "lc-footer lc-shell" },
            React.createElement("strong", null, "LUKULU ACADEMY"),
            React.createElement("p", null, "Music Production \u00B7 Music Business \u00B7 South Africa"),
            React.createElement("span", null, "\u00A9 2026 Lukulu Academy & Recordings")));
}
