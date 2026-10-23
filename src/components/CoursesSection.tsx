import { useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CheckIcon,
  Clock3Icon,
  HeadphonesIcon,
  Music2Icon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

type Category = 'all' | 'flstudio' | 'cubase' | 'business';
type Course = {
  code: string;
  category: Exclude<Category, 'all'>;
  track: string;
  title: string;
  level: string;
  duration: string;
  description: string;
  outcome: string;
  topics: string[];
  featured?: boolean;
};

const categories = [
  { id: 'all', label: 'All programmes', icon: Music2Icon },
  { id: 'flstudio', label: 'FL Studio', icon: Music2Icon },
  { id: 'cubase', label: 'Cubase', icon: HeadphonesIcon },
  { id: 'business', label: 'Music Business', icon: BriefcaseBusinessIcon },
] satisfies Array<{ id: Category; label: string; icon: typeof Music2Icon }>;

const courses: Course[] = [
  { code: 'FL-01', category: 'flstudio', track: 'FL Studio', title: 'FL Studio Foundations', level: 'Beginner', duration: '4 weeks', description: 'Learn the main FL Studio tools while building your first complete beat.', outcome: 'Finish and export one organised beat project.', topics: ['Interface and project setup', 'Channel Rack and drum patterns', 'Piano Roll basics', 'Simple song arrangement'] },
  { code: 'FL-02', category: 'flstudio', track: 'FL Studio', title: 'Beat Architecture', level: 'Intermediate', duration: '6 weeks', description: 'Create stronger drums, melodies and arrangements for modern beat production.', outcome: 'Build a three-beat portfolio in your chosen style.', topics: ['Groove and drum variation', 'Sampling and sound choice', 'Bass and melody writing', 'Transitions and arrangement'] },
  { code: 'FL-03', category: 'flstudio', track: 'FL Studio', title: 'Mixing Systems', level: 'Intermediate', duration: '6 weeks', description: 'Use a repeatable FL Studio mixing process to make clear, balanced tracks.', outcome: 'Deliver one feedback-ready mix and organised stems.', topics: ['Mixer routing and gain staging', 'EQ and compression', 'Vocal and instrument balance', 'Automation and mix checks'] },
  { code: 'FL-04', category: 'flstudio', track: 'FL Studio', title: 'Mastering for Streaming', level: 'Advanced', duration: '4 weeks', description: 'Prepare clean, competitive masters for streaming and digital release.', outcome: 'Export a final master and platform-ready versions.', topics: ['Mix preparation', 'Tone and dynamics', 'Loudness and limiting', 'Quality control and exports'] },
  { code: 'CB-01', category: 'cubase', track: 'Cubase', title: 'Cubase Foundations', level: 'Beginner', duration: '5 weeks', description: 'Set up Cubase, record audio and MIDI, and complete a simple production.', outcome: 'Finish one recorded and arranged Cubase project.', topics: ['Audio and device setup', 'MIDI and instrument tracks', 'Audio recording and editing', 'Arrangement and export'] },
  { code: 'CB-02', category: 'cubase', track: 'Cubase', title: 'Music Production Workflow', level: 'Intermediate', duration: '6 weeks', description: 'Develop ideas faster with practical writing, recording and editing systems.', outcome: 'Turn a short idea into a complete production.', topics: ['Project templates', 'Chord and melody tools', 'Comping and audio editing', 'Automation and arrangement'] },
  { code: 'CB-03', category: 'cubase', track: 'Cubase', title: 'Mix Workflow', level: 'Advanced', duration: '6 weeks', description: 'Build a professional Cubase mix from session preparation to final delivery.', outcome: 'Complete one translated mix and export clean stems.', topics: ['Session cleanup and balance', 'Channel Strip processing', 'Groups, effects and depth', 'Mix review and final export'] },
  { code: 'MB-01', category: 'business', track: 'Music Business', title: 'Music Business Essentials', level: 'All levels', duration: '4 weeks', description: 'Understand how songs, recordings, releases and music income connect.', outcome: 'Map your own practical route from music project to release.', topics: ['Industry roles and income', 'Songs versus recordings', 'Credits and agreements', 'Release workflow'] },
  { code: 'MB-02', category: 'business', track: 'Music Business', title: 'Copyright & Beat Licensing', level: 'All levels', duration: '3 weeks', description: 'Learn ownership basics and use clearer agreements for beats and collaborations.', outcome: 'Prepare a split sheet and a simple beat-licensing checklist.', topics: ['Copyright basics', 'Song splits and producer rights', 'Lease and exclusive licences', 'Records and agreement checks'] },
  { code: 'MB-03', category: 'business', track: 'Music Business', title: 'Royalties & Metadata', level: 'All levels', duration: '3 weeks', description: 'Organise the information and registrations needed to collect music income.', outcome: 'Build accurate credits, metadata and a royalty-registration plan.', topics: ['Royalty types', 'ISRCs and release metadata', 'Collection organisations', 'Statements and record keeping'] },
  { code: 'MB-04', category: 'business', track: 'Music Business', title: 'Independent Release Plan', level: 'All levels', duration: '4 weeks', description: 'Plan a focused independent release with realistic dates, assets and promotion.', outcome: 'Leave with a practical four-week release plan.', topics: ['Release goals and timeline', 'Distribution preparation', 'Artwork and content checklist', 'Launch and follow-up'] },
];

export function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const filteredCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const categoryMatch = activeCategory === 'all' || course.category === activeCategory;
      const searchMatch = !needle || [course.code, course.track, course.title, course.level, course.description, course.outcome, ...course.topics].join(' ').toLowerCase().includes(needle);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  return (
    <section id="courses" className="course-library signal-section section-pad" aria-labelledby="courses-heading">
      <div className="page-shell">
        <SectionIntro headingId="courses-heading" number="02" eyebrow="Course library" title="Choose your learning path" description="Browse by software, skill or career goal. Every programme ends with a practical result you can use in a real music project." />

        <Reveal className="course-library__tools">
          <div className="course-filter" role="group" aria-label="Filter courses by learning track">
            {categories.map(({ id, label, icon: Icon }) => {
              const count = id === 'all' ? courses.length : courses.filter((course) => course.category === id).length;
              return <button key={id} type="button" className={activeCategory === id ? 'is-active' : ''} aria-pressed={activeCategory === id} onClick={() => setActiveCategory(id)}><Icon aria-hidden="true" /><span>{label}</span><small>{count}</small></button>;
            })}
          </div>
          <label className="course-search"><span>Search the course library</span><div><SearchIcon aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “mixing”, “beginner” or “Cubase”" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear course search"><XIcon aria-hidden="true" /></button>}</div></label>
        </Reveal>

        <div className="course-library__status" role="status" aria-live="polite"><strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'programme' : 'programmes'} found</div>

        {filteredCourses.length > 0 ? <div className="course-card-grid">
          {filteredCourses.map((course, index) => <Reveal key={course.code} delay={Math.min(index, 5) * 0.035}>
            <article className={`course-card ${course.featured ? 'course-card--featured' : ''}`}>
              <div className="course-card__top"><span>{course.code}</span><span>{course.track}</span>{course.featured && <strong>Flagship</strong>}</div>
              <div className="course-card__heading"><p>{course.level}</p><h3>{course.title}</h3></div>
              <p className="course-card__description">{course.description}</p>
              <p className="course-card__duration"><Clock3Icon aria-hidden="true" /> {course.duration}</p>
              <details className="course-card__details">
                <summary>Course details <span aria-hidden="true">+</span></summary>
                <ul>{course.topics.map((topic) => <li key={topic}><CheckIcon aria-hidden="true" />{topic}</li>)}</ul>
                <div className="course-card__outcome"><span>You will finish with</span><p>{course.outcome}</p></div>
              </details>
              <Link to={`/enquire?category=academy&service=remote-course&course=${encodeURIComponent(course.title)}`}>Ask about course <ArrowRightIcon aria-hidden="true" /></Link>
            </article>
          </Reveal>)}
        </div> : <div className="course-empty"><SearchIcon aria-hidden="true" /><h3>No programmes found</h3><p>Try a shorter search or choose another learning track.</p><button type="button" className="button button-quiet" onClick={() => { setQuery(''); setActiveCategory('all'); }}>Show all programmes</button></div>}
      </div>
    </section>
  );
}
