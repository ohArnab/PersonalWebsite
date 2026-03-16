import { useState } from 'react';
import AsciiCube from './AsciiCube';

const sections = ['Home', 'About', 'Projects', 'Resume', 'Skills', 'Contact'] as const;
type Section = typeof sections[number];

interface GUIModeProps {
  onSwitchToTerminal: () => void;
}

const GUIMode = ({ onSwitchToTerminal }: GUIModeProps) => {
  const [active, setActive] = useState<Section>('Home');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-muted">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <pre className="text-terminal-green text-[8px] leading-none hidden sm:block">
{`+--+
|  |
+--+`}
            </pre>
            <h1 className="text-lg font-bold text-foreground tracking-wider">ARNAB NATH</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-1">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setActive(s)}
                  className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                    active === s
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
              onClick={() => setActive(s)}
              className={`px-3 py-1 text-xs rounded-sm whitespace-nowrap transition-colors ${
                active === s
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
        {active === 'Home' && <HomeSection />}
        {active === 'About' && <AboutSection />}
        {active === 'Projects' && <ProjectsSection />}
        {active === 'Resume' && <ResumeSection />}
        {active === 'Skills' && <SkillsSection />}
        {active === 'Contact' && <ContactSection />}
      </main>
    </div>
  );
};

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-border rounded-sm bg-card">
    <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
        <span className="w-2 h-2 rounded-full bg-[hsl(39,100%,50%)] inline-block" />
        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
      </div>
      <span className="text-xs text-muted-foreground ml-2">{title}</span>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const HomeSection = () => (
  <div className="space-y-8">
    <div className="flex flex-col items-center text-center py-12">
      <AsciiCube />
      <h2 className="text-3xl font-bold text-foreground mt-6 tracking-wider">ARNAB NATH</h2>
      <p className="text-terminal-green mt-2 text-sm">Developer • Systems Administrator • Tinkerer</p>
      <p className="text-muted-foreground mt-4 max-w-md text-sm">
        Building at the intersection of infrastructure and code. Welcome to my operating system.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: '📁', title: '3 Projects', desc: 'Automation, scraping, ML' },
        { icon: '🛠️', title: 'Full Stack', desc: 'Python, JS, PowerShell' },
        { icon: '⚡', title: 'Infrastructure', desc: 'VMware, AD, Linux' },
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
      <p>Hey! I'm <span className="text-terminal-green font-bold">Arnab</span> — a developer, tinkerer, and systems enthusiast.</p>
      <p>I love building things that live at the intersection of infrastructure and code.</p>
      <p>When I'm not automating things with PowerCLI or writing Python scripts, you'll find me exploring new tech, taking photos, or tweaking my Linux setup for the 100th time.</p>
      <div className="flex gap-4 text-xs text-muted-foreground mt-6">
        <span>📍 Earth</span>
        <span>🟢 Open to opportunities</span>
        <span>☕ Always caffeinated</span>
      </div>
    </div>
  </Panel>
);

const ProjectsSection = () => (
  <div className="space-y-4">
    {[
      {
        name: 'VMware Automation Suite',
        tech: 'PowerShell, PowerCLI, VMware vSphere',
        desc: 'Automated VM lifecycle management — provisioning, snapshots, monitoring & bulk ops.',
      },
      {
        name: 'Torrent Metadata Scraper',
        tech: 'Python, BeautifulSoup, SQLite',
        desc: 'Web scraper for aggregating torrent metadata with deduplication and CLI interface.',
      },
      {
        name: 'Reinforcement Learning Project',
        tech: 'Python, TensorFlow, OpenAI Gym',
        desc: 'RL agent with DQN implementation, custom reward shaping, and training visualization.',
      },
    ].map((project) => (
      <Panel key={project.name} title={`~/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <h3 className="text-foreground font-bold">{project.name}</h3>
        <p className="text-terminal-green text-xs mt-1">{project.tech}</p>
        <p className="text-muted-foreground text-sm mt-3">{project.desc}</p>
      </Panel>
    ))}
  </div>
);

const ResumeSection = () => (
  <Panel title="~/resume/resume.pdf">
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="text-terminal-pink font-bold text-xs uppercase tracking-widest">Experience</h3>
        <div className="mt-2 text-foreground">
          <p className="font-bold">Systems Administrator</p>
          <ul className="text-muted-foreground text-xs mt-1 space-y-1">
            <li>• VMware infrastructure management</li>
            <li>• Windows Server & Active Directory</li>
            <li>• Automation with PowerShell/Ansible</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text-terminal-pink font-bold text-xs uppercase tracking-widest">Education</h3>
        <p className="text-foreground mt-2">B.Tech Computer Science</p>
      </div>
      <div>
        <h3 className="text-terminal-pink font-bold text-xs uppercase tracking-widest">Certifications</h3>
        <ul className="text-foreground mt-2 text-xs space-y-1">
          <li>• VMware Certified Professional</li>
          <li>• AWS Cloud Practitioner</li>
        </ul>
      </div>
    </div>
  </Panel>
);

const SkillsSection = () => (
  <div className="grid md:grid-cols-3 gap-4">
    {[
      { title: 'Programming', items: ['Python', 'JavaScript', 'PowerShell', 'TypeScript'] },
      { title: 'Infrastructure', items: ['VMware vSphere', 'Windows Server', 'Active Directory', 'Linux'] },
      { title: 'Automation & Tools', items: ['PowerCLI', 'Ansible', 'Docker', 'Terraform', 'Git'] },
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
        { label: 'GitHub', value: 'github.com/arnab', icon: '🔗' },
        { label: 'LinkedIn', value: 'linkedin.com/in/arnab', icon: '💼' },
        { label: 'Email', value: 'arnab@email.com', icon: '📧' },
        { label: 'Twitter', value: '@arnab', icon: '🐦' },
      ].map((link) => (
        <div key={link.label} className="flex items-center gap-3 text-sm">
          <span>{link.icon}</span>
          <span className="text-muted-foreground w-20">{link.label}:</span>
          <span className="text-terminal-blue">{link.value}</span>
        </div>
      ))}
      <p className="text-muted-foreground text-xs mt-4">Feel free to reach out!</p>
    </div>
  </Panel>
);

export default GUIMode;
