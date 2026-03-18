import { useState } from 'react';
import { createPortal } from 'react-dom';

const sections = ['Home', 'About', 'Projects', 'Resume', 'Skills', 'Contact'] as const;
type Section = typeof sections[number];

export type { Section };

interface GUIModeProps {
  activeSection: Section;
  onSectionChange: (s: Section) => void;
  onSwitchToTerminal: () => void;
  showMinimizedTerminalTab?: boolean;
}

const GUIMode = ({ activeSection, onSectionChange, onSwitchToTerminal, showMinimizedTerminalTab = false }: GUIModeProps) => {

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border bg-muted">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go to Home"
              title="Go to Home"
              onClick={() => onSectionChange('Home')}
              className="shrink-0 transition-opacity hover:opacity-90"
            >
              <img
                src="/Asnath.ico"
                alt="Asnath icon"
                className="h-8 w-8 object-contain"
              />
            </button>
            <h1 className="text-lg font-bold text-foreground tracking-wider">ARNAB NATH</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-1">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => onSectionChange(s)}
                  className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                    activeSection === s
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </nav>
            <button
              onClick={onSwitchToTerminal}
              className="text-xs text-terminal-green border border-primary/30 px-3 py-1.5 rounded-sm hover:bg-primary/10 transition-colors"
            >
              {'>'} Terminal
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden border-t border-border px-4 py-2 flex gap-1 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => onSectionChange(s)}
              className={`px-3 py-1 text-xs rounded-sm whitespace-nowrap transition-colors ${
                activeSection === s
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {activeSection === 'Home' && <HomeSection />}
        {activeSection === 'About' && <AboutSection />}
        {activeSection === 'Projects' && <ProjectsSection />}
        {activeSection === 'Resume' && <ResumeSection />}
        {activeSection === 'Skills' && <SkillsSection />}
        {activeSection === 'Contact' && <ContactSection />}
      </main>

      {showMinimizedTerminalTab && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
          <button
            type="button"
            onClick={onSwitchToTerminal}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground shadow-lg transition-colors hover:bg-muted"
          >
            <span className="text-terminal-green">&gt;_</span>
            <span>Terminal</span>
          </button>
        </div>
      )}

      {/* Dock for closed panels — Panels portal their badges here */}
      <div id="panel-dock" className="fixed bottom-4 left-4 z-40 flex flex-row flex-wrap gap-2 items-end max-w-xs" />
    </div>
  );
};

type WindowState = 'normal' | 'minimized' | 'maximized' | 'closed';

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [winState, setWinState] = useState<WindowState>('normal');

  const toggle = (next: WindowState) =>
    setWinState((cur) => (cur === next ? 'normal' : next));

  // Badge portalled into the bottom-left dock when closed
  const dockEl = typeof document !== 'undefined' ? document.getElementById('panel-dock') : null;
  const closedBadge =
    winState === 'closed' && dockEl
      ? createPortal(
          <button
            type="button"
            title={`Restore ${title}`}
            onClick={() => setWinState('normal')}
            className="flex items-center gap-1.5 rounded-sm border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground shadow hover:text-foreground hover:bg-card transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
            <span className="truncate max-w-[110px]">{title}</span>
          </button>,
          dockEl
        )
      : null;

  if (winState === 'closed') return <>{closedBadge}</>;

  const isMaximized = winState === 'maximized';
  const isMinimized = winState === 'minimized';

  const panel = (
    <div
      className={
        isMaximized
          ? 'fixed inset-0 z-50 flex flex-col bg-card border border-border overflow-hidden'
          : 'border border-border rounded-sm bg-card'
      }
    >
      {/* Title bar */}
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <button
            type="button"
            title="Close"
            onClick={() => setWinState('closed')}
            className="w-2.5 h-2.5 rounded-full bg-destructive hover:brightness-110 transition-all focus:outline-none"
          />
          <button
            type="button"
            title={isMinimized ? 'Restore' : 'Minimise'}
            onClick={() => toggle('minimized')}
            className="w-2.5 h-2.5 rounded-full bg-[hsl(39,100%,50%)] hover:brightness-110 transition-all focus:outline-none"
          />
          <button
            type="button"
            title={isMaximized ? 'Restore' : 'Fullscreen'}
            onClick={() => toggle('maximized')}
            className="w-2.5 h-2.5 rounded-full bg-primary hover:brightness-110 transition-all focus:outline-none"
          />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
        {isMaximized && (
          <button
            type="button"
            onClick={() => setWinState('normal')}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕ exit fullscreen
          </button>
        )}
      </div>

      {/* Body — hidden when minimised */}
      {!isMinimized && (
        <div className={isMaximized ? 'flex-1 overflow-y-auto p-6' : 'p-6'}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {closedBadge}
      {panel}
    </>
  );
};

const HomeSection = () => (
  <div className="space-y-8">
    <div className="flex flex-col items-center text-center py-12">
      <h2 className="text-3xl font-bold text-foreground mt-6 tracking-wider">ARNAB NATH</h2>
      <p className="text-terminal-green mt-2 text-sm">Developer • Systems Administrator • Tinkerer</p>
      <p className="text-muted-foreground mt-4 max-w-md text-sm">
        Building at the intersection of infrastructure and code. Welcome to my operating system.
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-4">
      {[
        { icon: '🚀', title: '4 Projects', desc: 'Physics engine, ML, full-stack, hackathon' },
        { icon: '🛠️', title: 'Full Stack', desc: 'Python, JS, TypeScript, SQL, C, Rust' },
        { icon: '☁️', title: 'Infrastructure', desc: 'VMware, AD, Linux, Azure, Kubernetes' },
        { icon: '🤖', title: 'AI & ML', desc: 'TensorFlow, XGBoost, RL, Scikit-learn' },
      ].map((item) => (
        <Panel key={item.title} title={item.title}>
          <div className="text-center">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-sm font-bold text-foreground mt-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </div>
        </Panel>
      ))}
    </div>
  </div>
);

const AboutSection = () => (
  <Panel title="~/about/bio.txt">
    <div className="space-y-4 text-sm text-foreground leading-relaxed">
      <p>Hi, I am <span className="text-terminal-green font-bold">Arnab</span> — a CS student at TMU.</p>
      <p>
        I spend most of my time building things, breaking them, and rebuilding them like that was the plan all along.
        I am a development tinkerer who likes understanding how systems work, then pushing them a little further than they need to go.
      </p>
      <p>
        Over my last two co-op terms with the City of Toronto, I worked across Infrastructure and Platform Support.
        That gave me hands-on experience with systems, backend workflows, and automation, and confirmed I enjoy working close
        to both the code and the systems it runs on.
      </p>
      <p>
        Lately, I have been leaning more into data and model building. There is something satisfying about optimizing systems
        until they finally click. I am also big on automation: if I do something more than twice, I usually script it.
      </p>
      <p>
        Outside work and school, I spend a lot of time with custom OS setups, homelabs, hardware builds, and home servers.
        I also play competitive FPS games and occasionally fall into marketplace doomscrolling.
      </p>
      <p>
        Recently, I have been trying to travel more. So far: New York, France, and Montreal, and I am hoping to keep that list growing.
      </p>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-6">
        <span>🎓 TMU CS</span>
        <span>🟢 Open to opportunities</span>
        <span>⚙️ Systems + Code + Automation</span>
      </div>
    </div>
  </Panel>
);

const ProjectsSection = () => (
  <div className="space-y-4">
    {[
      {
        name: 'Real-Time Physics Engine',
        icon: '⚙️',
        tech: 'C++, CUDA, OpenGL, SDL2, Linux',
        period: 'Jul 2025',
        bullets: [
          'Built a custom 2D/3D physics engine with collision detection and rigid body simulation',
          'Integrated CUDA for parallelized force calculations; used OpenGL/SDL2 for real-time visualization',
          'Designed modular architecture with reusable math and physics components',
          'Implemented profiling and benchmarking tools to compare GPU and CPU performance',
        ],
      },
      {
        name: 'Formula 1 Race Prediction',
        icon: '🏎️',
        tech: 'Python, TensorFlow, XGBoost, Scikit-learn, Pandas',
        period: 'Apr 2025',
        bullets: [
          'Developed ML models (RF, SVM, LSTM, XGBoost) for predictive modeling on 24K+ race results',
          'Built an Elo rating system with hyperparameter tuning and cross-validation, achieving 97.4% accuracy',
          'Visualized insights with Matplotlib dashboards and deployed reproducible pipelines',
        ],
      },
      {
        name: 'Car Dealership Database System',
        icon: '🚗',
        tech: 'Oracle SQL, React, Flask, Linux Shell Scripting',
        period: 'Nov 2024',
        bullets: [
          'Developed full-stack inventory management platform with React frontend and Flask REST API',
          'Designed normalized schema with secure role-based access and backend testing (PyTest)',
          'Automated deployment using shell scripts and CI/CD workflows',
        ],
      },
      {
        name: 'FarmBuddy (TerraHacks Hackathon)',
        icon: '🌱',
        tech: 'ReactJS, Vite, Flask, Scikit-learn, Pandas, TensorFlow',
        period: 'Aug 2024',
        bullets: [
          'Built a web app integrating sensor data and ML models for crop health monitoring',
          'Implemented Cohere NLP API for smart insights; designed responsive UI and Flask data ingestion endpoints',
          'Delivered MVP in 36 hours with 4-person agile team; pitched live prototype to judges',
        ],
      },
    ].map((project) => (
      <Panel key={project.name} title={`📁 ~/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h3 className="text-foreground font-bold">{project.icon} {project.name}</h3>
          <span className="text-xs text-muted-foreground">{project.period}</span>
        </div>
        <p className="text-terminal-green text-xs mb-3">{project.tech}</p>
        <ul className="space-y-1">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-terminal-green shrink-0">▸</span>{b}
            </li>
          ))}
        </ul>
      </Panel>
    ))}
  </div>
);

const ResumeSection = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="border border-border rounded-sm bg-card px-6 py-5 text-center space-y-2">
      <h2 className="text-2xl font-bold tracking-wider text-foreground">ARNAB NATH</h2>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <a href="mailto:arnab.snath@gmail.com" className="hover:text-terminal-green transition-colors">✉️ arnab.snath@gmail.com</a>
        <a href="tel:+16478776518" className="hover:text-terminal-green transition-colors">📞 647-877-6518</a>
        <a href="https://www.linkedin.com/in/asnath/" target="_blank" rel="noreferrer" className="hover:text-terminal-blue transition-colors">💼 LinkedIn</a>
        <a href="https://github.com/Arfx45" target="_blank" rel="noreferrer" className="hover:text-terminal-blue transition-colors">🐙 GitHub</a>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <a
          href="/Software%20Eng%20Res.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-sm border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-terminal-green transition-colors hover:bg-primary/20"
        >
          ↗ Open PDF
        </a>
        <a
          href="/Software%20Eng%20Res.pdf"
          download
          className="inline-flex items-center rounded-sm border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
        >
          ↓ Download PDF
        </a>
      </div>
    </div>

    {/* Education */}
    <Panel title="🎓 Education">
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-semibold text-sm text-foreground">Toronto Metropolitan University</span>
          <span className="text-xs text-muted-foreground">Expected Apr 2027</span>
        </div>
        <p className="text-xs text-terminal-green">B.Sc. Computer Science (Co-op)</p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li className="flex gap-2"><span className="text-terminal-green shrink-0">▸</span>90%+ Entrance Scholarship — TMU Science Union — Terahacks — Open Source Contributor</li>
          <li className="flex gap-2"><span className="text-terminal-green shrink-0">▸</span>Relevant Coursework: Software Engineering, Database Systems, Web Development, Data Structures, Machine Learning, Reinforcement Learning, Operating Systems, Computer Security</li>
        </ul>
      </div>
    </Panel>

    {/* Experience */}
    <Panel title="💼 Experience">
      <div className="space-y-6">
        {[
          {
            role: 'IT Trainee – Platform Support (Salesforce / 311)',
            org: 'City of Toronto',
            location: 'Toronto, ON',
            period: 'Sept 2025 – Dec 2025',
            bullets: [
              "Supported the City of Toronto's 311 Salesforce Service Cloud, resolving workflow, permission, and data issues",
              'Executed complex SQL queries for operational data requests and reporting from relational databases',
              'Led database query performance optimizations by improving joins, normalization, and query safeguards',
            ],
          },
          {
            role: 'IT Trainee – Infrastructure',
            org: 'City of Toronto',
            location: 'Toronto, ON',
            period: 'May 2025 – Aug 2025',
            bullets: [
              'Built automation with PowerCLI and Ansible to streamline patching and reporting across 1,200+ Windows servers',
              'Automated WSUS patching workflows and compliance reporting, reducing manual effort during maintenance windows',
              'Developed scripts to audit and remediate Active Directory access controls across 100+ teams for security compliance',
              'Managed VMware vSphere/ESXi environments including VM provisioning, vMotion, and maintenance automation',
            ],
          },
          {
            role: 'Admin Trainee',
            org: 'City of Toronto',
            location: 'Toronto, ON',
            period: 'May 2024 – Aug 2024',
            bullets: [
              'Automated Excel VBA and Python reporting pipelines, cutting turnaround time by 60% for KPI and audits',
              'Built Tableau dashboards and Python scripts to automate compliance workflows and visualize metrics',
              'Developed PowerShell/Bash scripts for digitization and validation, improving reporting accuracy',
              'Integrated KPI reporting with IT systems for real-time insights across business units',
              'Authored internal documentation to enable handoff of automation tools to non-technical staff',
            ],
          },
          {
            role: 'Software Engineer, Full-Stack Development',
            org: 'INFONET',
            location: 'Toronto, ON',
            period: 'Jun 2021 – Dec 2021',
            bullets: [
              'Built full-stack apps using Flask, React, and SQL with REST APIs and 90% unit test coverage',
              'Maintained CI/CD pipelines (Git, Docker), optimized SQL queries, and improved API performance',
              'Reduced bug resolution time by 25% through better defect tracking, testing coverage, and QA collaboration',
              'Designed reusable UI components and authentication modules for scalable product features',
              'Worked with DevOps to enhance deployment reliability and documentation',
            ],
          },
        ].map((job) => (
          <div key={job.role + job.org} className="space-y-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-sm text-foreground">{job.org}</span>
              <span className="text-xs text-muted-foreground">{job.period}</span>
            </div>
            <p className="text-xs text-terminal-green">{job.role} — {job.location}</p>
            <ul className="mt-1.5 space-y-1">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="text-terminal-green shrink-0">▸</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>

    {/* Projects */}
    <Panel title="🚀 Projects">
      <div className="space-y-6">
        {[
          {
            name: 'Real-Time Physics Engine (Academic)',
            icon: '⚙️',
            stack: 'C++, CUDA, OpenGL, SDL2, Linux',
            period: 'Jul 2025',
            bullets: [
              'Built a custom 2D/3D physics engine with collision detection and rigid body simulation',
              'Integrated CUDA for parallelized force calculations; used OpenGL/SDL2 for real-time visualization',
              'Designed modular architecture with reusable math and physics components',
              'Implemented profiling and benchmarking tools to compare GPU and CPU performance',
            ],
          },
          {
            name: 'Formula 1 Race Prediction',
            icon: '🏎️',
            stack: 'Python, TensorFlow, XGBoost, Scikit-learn, Pandas',
            period: 'Apr 2025',
            bullets: [
              'Developed ML models (RF, SVM, LSTM, XGBoost) for predictive modeling on 24K+ race results',
              'Built an Elo rating system with hyperparameter tuning and cross-validation, achieving 97.4% accuracy',
              'Visualized insights with Matplotlib dashboards and deployed reproducible pipelines',
            ],
          },
          {
            name: 'Car Dealership Database System',
            icon: '🚗',
            stack: 'Oracle SQL, React, Flask, Linux Shell Scripting',
            period: 'Nov 2024',
            bullets: [
              'Developed full-stack inventory management platform with React frontend and Flask REST API',
              'Designed normalized schema with secure role-based access and backend testing (PyTest)',
              'Automated deployment using shell scripts and CI/CD workflows',
            ],
          },
          {
            name: 'FarmBuddy (TerraHacks Hackathon)',
            icon: '🌱',
            stack: 'ReactJS, Vite, Flask, Scikit-learn, Pandas, TensorFlow',
            period: 'Aug 2024',
            bullets: [
              'Built a web app integrating sensor data and ML models for crop health monitoring and recommendations',
              'Implemented Cohere NLP API for smart insights; designed responsive UI and Flask data ingestion endpoints',
              'Delivered MVP in 36 hours with 4-person agile team; pitched live prototype to judges',
            ],
          },
        ].map((proj) => (
          <div key={proj.name} className="space-y-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-sm text-foreground">{proj.icon} {proj.name}</span>
              <span className="text-xs text-muted-foreground">{proj.period}</span>
            </div>
            <p className="text-xs text-terminal-green">{proj.stack}</p>
            <ul className="mt-1.5 space-y-1">
              {proj.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="text-terminal-green shrink-0">▸</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>

    {/* Technical Skills */}
    <Panel title="🛠️ Technical Skills">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
        {[
          { label: '📝 Languages', value: 'Python, Java, JavaScript, TypeScript, SQL, C, Rust, Bash, PowerShell' },
          { label: '⚛️ Frameworks & Libraries', value: 'React, Flask, Express.js, Node.js, REST, GraphQL, Bootstrap' },
          { label: '🐳 DevOps & Tools', value: 'Docker, CI/CD, Kubernetes, PowerCLI, Ansible, Git, Agile, Nginx' },
          { label: '🧪 Testing', value: 'PyTest, Jest, Mocha, Selenium, Unit Testing' },
          { label: '🗄️ Databases', value: 'Oracle SQL, PostgreSQL, MySQL, MongoDB' },
          { label: '☁️ Cloud & Infrastructure', value: 'VMware vSphere/ESXi, Windows Server (AD, WSUS), Ubuntu, CentOS, Azure Fundamentals' },
          { label: '🤖 Data & ML', value: 'TensorFlow, Scikit-learn, Pandas, NumPy, XGBoost, Reinforcement Learning' },
          { label: '🔧 Other Tools', value: 'Salesforce CRM, JIRA, ServiceNow, Tableau, Excel (VBA, Pivot Tables)' },
        ].map(({ label, value }) => (
          <div key={label} className="text-xs py-1">
            <span className="text-terminal-green font-semibold">{label}:</span>{' '}
            <span className="text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

const SkillsSection = () => (
  <div className="grid md:grid-cols-2 gap-4">
    {[
      { title: '📝 Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C', 'Rust', 'Bash', 'PowerShell'] },
      { title: '⚛️ Frameworks & Libraries', items: ['React', 'Flask', 'Express.js', 'Node.js', 'REST', 'GraphQL', 'Bootstrap'] },
      { title: '🐳 DevOps & Tools', items: ['Docker', 'CI/CD', 'Kubernetes', 'PowerCLI', 'Ansible', 'Git', 'Agile', 'Nginx'] },
      { title: '🧪 Testing', items: ['PyTest', 'Jest', 'Mocha', 'Selenium', 'Unit Testing'] },
      { title: '🗄️ Databases', items: ['Oracle SQL', 'PostgreSQL', 'MySQL', 'MongoDB'] },
      { title: '☁️ Cloud & Infrastructure', items: ['VMware vSphere/ESXi', 'Windows Server (AD, WSUS)', 'Ubuntu', 'CentOS', 'Azure Fundamentals'] },
      { title: '🤖 Data & ML', items: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'Reinforcement Learning'] },
      { title: '🔧 Other Tools', items: ['Salesforce CRM', 'JIRA', 'ServiceNow', 'Tableau', 'Excel (VBA, Pivot Tables)'] },
    ].map((group) => (
      <Panel key={group.title} title={group.title}>
        <ul className="space-y-2">
          {group.items.map((item) => (
            <li key={item} className="text-sm text-foreground flex items-center gap-2">
              <span className="text-terminal-green text-xs">▸</span> {item}
            </li>
          ))}
        </ul>
      </Panel>
    ))}
  </div>
);

const ContactSection = () => (
  <Panel title="~/contact/socials.txt">
    <div className="space-y-4">
      {[
        { label: 'GitHub', value: 'github.com/Arfx45', href: 'https://github.com/Arfx45', icon: '🐙' },
        { label: 'LinkedIn', value: 'linkedin.com/in/asnath', href: 'https://www.linkedin.com/in/asnath/', icon: '💼' },
        { label: 'Email', value: 'arnab.snath@gmail.com', href: 'mailto:arnab.snath@gmail.com', icon: '✉️' },
        { label: 'Phone', value: '647-877-6518', href: 'tel:+16478776518', icon: '📞' },
      ].map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          className="flex items-center gap-3 text-sm group"
        >
          <span>{link.icon}</span>
          <span className="text-muted-foreground w-20">{link.label}:</span>
          <span className="text-terminal-blue group-hover:text-terminal-green transition-colors">{link.value}</span>
        </a>
      ))}
      <p className="text-muted-foreground text-xs mt-4">Feel free to reach out!</p>
    </div>
  </Panel>
);

export default GUIMode;
