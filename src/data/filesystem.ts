export interface FSNode {
  type: 'dir' | 'file';
  children?: Record<string, FSNode>;
  content?: string;
  permissions?: string;
}

export const filesystem: Record<string, FSNode> = {
  about: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      'bio.txt': {
        type: 'file',
        permissions: '-rw-r--r--',
        content: `╔══════════════════════════════════════════╗
║             ARNAB NATH                   ║
╚══════════════════════════════════════════╝

Hey! I'm Arnab — a developer, tinkerer, and
systems enthusiast.

I love building things that live at the
intersection of infrastructure and code.

When I'm not automating things with PowerCLI
or writing Python scripts, you'll find me
exploring new tech, taking photos, or
tweaking my Linux setup for the 100th time.

Location: Earth
Status: Open to opportunities
Coffee: Always`,
      },
    },
  },
  projects: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      'vmware-automation': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# VMware Automation Suite

Automated VM lifecycle management using PowerCLI.

Tech: PowerShell, PowerCLI, VMware vSphere
Features:
  - Automated VM provisioning
  - Snapshot management
  - Resource monitoring & alerts
  - Bulk operations via CSV

GitHub: github.com/arnab/vmware-automation`,
          },
        },
      },
      'torrent-scraper': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# Torrent Metadata Scraper

Web scraper for aggregating torrent metadata.

Tech: Python, BeautifulSoup, SQLite
Features:
  - Multi-source scraping
  - Deduplication engine
  - SQLite storage
  - CLI interface

GitHub: github.com/arnab/torrent-scraper`,
          },
        },
      },
      'reinforcement-learning': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# Reinforcement Learning Project

RL agent for game environment navigation.

Tech: Python, TensorFlow, OpenAI Gym
Features:
  - DQN implementation
  - Custom reward shaping
  - Training visualization
  - Performance benchmarks

GitHub: github.com/arnab/rl-project`,
          },
        },
      },
    },
  },
  resume: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      'resume.pdf': {
        type: 'file',
        permissions: '-rw-r--r--',
        content: `╔══════════════════════════════════════════╗
║           RESUME — ARNAB NATH            ║
╚══════════════════════════════════════════╝

EXPERIENCE
──────────
Systems Administrator
  • VMware infrastructure management
  • Windows Server & Active Directory
  • Automation with PowerShell/Ansible

EDUCATION
──────────
B.Tech Computer Science

CERTIFICATIONS
──────────
  • VMware Certified Professional
  • AWS Cloud Practitioner

SKILLS
──────────
Languages: Python, JavaScript, PowerShell
Infra: VMware, Windows Server, AD, Linux
Tools: Ansible, Docker, Git, Terraform`,
      },
    },
  },
  photos: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      cars: {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {},
      },
      travel: {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {},
      },
    },
  },
  contact: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      'socials.txt': {
        type: 'file',
        permissions: '-rw-r--r--',
        content: `╔══════════════════════════════════════╗
║          CONTACT & SOCIALS           ║
╚══════════════════════════════════════╝

GitHub:   github.com/arnab
LinkedIn: linkedin.com/in/arnab
Email:    arnab@email.com
Twitter:  @arnab

Feel free to reach out!`,
      },
    },
  },
};

export function resolvePath(
  path: string,
  currentDir: string
): { node: FSNode | null; absolutePath: string } {
  let parts: string[];

  if (path.startsWith('/')) {
    parts = path.split('/').filter(Boolean);
  } else {
    const currentParts = currentDir.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);
    parts = [...currentParts, ...pathParts];
  }

  // resolve .. and .
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === '..') resolved.pop();
    else if (p !== '.') resolved.push(p);
  }

  if (resolved.length === 0) {
    return {
      node: { type: 'dir', children: filesystem },
      absolutePath: '/',
    };
  }

  let current: Record<string, FSNode> = filesystem;
  for (let i = 0; i < resolved.length; i++) {
    const entry = current[resolved[i]];
    if (!entry) return { node: null, absolutePath: '/' + resolved.join('/') };
    if (i === resolved.length - 1) {
      return { node: entry, absolutePath: '/' + resolved.join('/') };
    }
    if (entry.type === 'dir' && entry.children) {
      current = entry.children;
    } else {
      return { node: null, absolutePath: '/' + resolved.join('/') };
    }
  }

  return { node: null, absolutePath: '/' + resolved.join('/') };
}

export function getTree(node: FSNode, prefix = '', name = ''): string {
  const lines: string[] = [];
  if (name) lines.push(prefix + name);

  if (node.type === 'dir' && node.children) {
    const entries = Object.entries(node.children);
    entries.forEach(([key, child], i) => {
      const isLast = i === entries.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const childPrefix = isLast ? '    ' : '│   ';
      if (child.type === 'dir') {
        lines.push(prefix + connector + key + '/');
        const subtree = getTree(child, prefix + childPrefix, '');
        if (subtree) lines.push(subtree);
      } else {
        lines.push(prefix + connector + key);
      }
    });
  }
  return lines.join('\n');
}
