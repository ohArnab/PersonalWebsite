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

    Hi, I am Arnab - a CS student at TMU.

    I spend most of my time building things,
    breaking them, and rebuilding them.
    I like understanding how systems work,
    then pushing them a little further.

    Over my last two co-op terms at the City of
    Toronto, I worked with Infrastructure and
    Platform Support, focusing on backend work,
    systems, and automation.

    Lately, I have been leaning more into data
    and model building. I also automate anything
    I do more than twice.

    Outside work and school, I tinker with
    custom OS setups, homelabs, hardware,
    and home servers.

    I also play competitive FPS games and travel
    when I can. So far: New York, France,
    and Montreal.

    Status: Open to opportunities
    Focus: Systems + Code + Automation`,
      },
    },
  },
  projects: {
    type: 'dir',
    permissions: 'drwxr-xr-x',
    children: {
      'physics-engine': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# Real-Time Physics Engine (Academic) — Jul 2025

Tech: C++, CUDA, OpenGL, SDL2, Linux

  ▸ Built a custom 2D/3D physics engine with collision detection and rigid body simulation
  ▸ Integrated CUDA for parallelized force calculations; used OpenGL/SDL2 for real-time visualization
  ▸ Designed modular architecture with reusable math and physics components
  ▸ Implemented profiling and benchmarking tools to compare GPU and CPU performance

GitHub: https://github.com/Arfx45`,
          },
        },
      },
      'f1-race-prediction': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# Formula 1 Race Prediction — Apr 2025

Tech: Python, TensorFlow, XGBoost, Scikit-learn, Pandas

  ▸ Developed ML models (RF, SVM, LSTM, XGBoost) for predictive modeling on 24K+ race results
  ▸ Built an Elo rating system with hyperparameter tuning and cross-validation, achieving 97.4% accuracy
  ▸ Visualized insights with Matplotlib dashboards and deployed reproducible pipelines

GitHub: https://github.com/Arfx45`,
          },
        },
      },
      'car-dealership-db': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# Car Dealership Database System — Nov 2024

Tech: Oracle SQL, React, Flask, Linux Shell Scripting

  ▸ Developed full-stack inventory management platform with React frontend and Flask REST API
  ▸ Designed normalized schema with secure role-based access and backend testing (PyTest)
  ▸ Automated deployment using shell scripts and CI/CD workflows

GitHub: https://github.com/Arfx45`,
          },
        },
      },
      'farmbuddy': {
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: {
          'README.md': {
            type: 'file',
            permissions: '-rw-r--r--',
            content: `# FarmBuddy (TerraHacks Hackathon) — Aug 2024

Tech: ReactJS, Vite, Flask, Scikit-learn, Pandas, TensorFlow

  ▸ Built a web app integrating sensor data and ML models for crop health monitoring
  ▸ Implemented Cohere NLP API for smart insights; designed responsive UI and Flask data ingestion endpoints
  ▸ Delivered MVP in 36 hours with 4-person agile team; pitched live prototype to judges

GitHub: https://github.com/Arfx45`,
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
        content: `ARNAB NATH
arnab.snath@gmail.com  |  647-877-6518  |  LinkedIn  |  GitHub

════════════════════════════════════════════════════════════════
 EDUCATION
════════════════════════════════════════════════════════════════

Toronto Metropolitan University                        Expected Apr 2027
B.Sc. Computer Science (Co-op)
  ▸ 90%+ Entrance Scholarship — TMU Science Union — Terahacks — Open Source Contributor
  ▸ Relevant Coursework: Software Engineering, Database Systems, Web Development,
    Data Structures, Machine Learning, Reinforcement Learning, Operating Systems,
    Computer Security

════════════════════════════════════════════════════════════════
 EXPERIENCE
════════════════════════════════════════════════════════════════

City of Toronto — IT Trainee, Platform Support (Salesforce / 311)
Toronto, ON                                         Sept 2025 – Dec 2025
  ▸ Supported the City of Toronto's 311 Salesforce Service Cloud, resolving
    workflow, permission, and data issues
  ▸ Executed complex SQL queries for operational data requests and reporting
    from relational databases
  ▸ Led database query performance optimizations by improving joins,
    normalization, and query safeguards

City of Toronto — IT Trainee, Infrastructure
Toronto, ON                                          May 2025 – Aug 2025
  ▸ Built automation with PowerCLI and Ansible to streamline patching and
    reporting across 1,200+ Windows servers
  ▸ Automated WSUS patching workflows and compliance reporting, reducing
    manual effort during maintenance windows
  ▸ Developed scripts to audit and remediate Active Directory access controls
    across 100+ teams for security compliance
  ▸ Managed VMware vSphere/ESXi environments including VM provisioning,
    vMotion, and maintenance automation

City of Toronto — Admin Trainee
Toronto, ON                                          May 2024 – Aug 2024
  ▸ Automated Excel VBA and Python reporting pipelines, cutting turnaround
    time by 60% for KPI and audits
  ▸ Built Tableau dashboards and Python scripts to automate compliance
    workflows and visualize metrics
  ▸ Developed PowerShell/Bash scripts for digitization and validation,
    improving reporting accuracy
  ▸ Integrated KPI reporting with IT systems for real-time insights across
    business units
  ▸ Authored internal documentation to enable handoff of automation tools
    to non-technical staff

INFONET — Software Engineer, Full-Stack Development
Toronto, ON                                          Jun 2021 – Dec 2021
  ▸ Built full-stack apps using Flask, React, and SQL with REST APIs and
    90% unit test coverage
  ▸ Maintained CI/CD pipelines (Git, Docker), optimized SQL queries, and
    improved API performance
  ▸ Reduced bug resolution time by 25% through better defect tracking,
    testing coverage, and QA collaboration
  ▸ Designed reusable UI components and authentication modules for scalable
    product features
  ▸ Worked with DevOps to enhance deployment reliability and documentation

════════════════════════════════════════════════════════════════
 PROJECTS
════════════════════════════════════════════════════════════════

Real-Time Physics Engine (Academic)                           Jul 2025
C++, CUDA, OpenGL, SDL2, Linux
  ▸ Built a custom 2D/3D physics engine with collision detection and rigid
    body simulation
  ▸ Integrated CUDA for parallelized force calculations; used OpenGL/SDL2
    for real-time visualization
  ▸ Designed modular architecture with reusable math and physics components
  ▸ Implemented profiling and benchmarking tools to compare GPU and CPU
    performance

Formula 1 Race Prediction                                     Apr 2025
Python, TensorFlow, XGBoost, Scikit-learn, Pandas
  ▸ Developed ML models (RF, SVM, LSTM, XGBoost) for predictive modeling
    on 24K+ race results
  ▸ Built an Elo rating system with hyperparameter tuning and cross-
    validation, achieving 97.4% accuracy
  ▸ Visualized insights with Matplotlib dashboards and deployed reproducible
    pipelines

Car Dealership Database System                                Nov 2024
Oracle SQL, React, Flask, Linux Shell Scripting
  ▸ Developed full-stack inventory management platform with React frontend
    and Flask REST API
  ▸ Designed normalized schema with secure role-based access and backend
    testing (PyTest)
  ▸ Automated deployment using shell scripts and CI/CD workflows

FarmBuddy (TerraHacks Hackathon)                             Aug 2024
ReactJS, Vite, Flask, Scikit-learn, Pandas, TensorFlow
  ▸ Built a web app integrating sensor data and ML models for crop health
    monitoring and recommendations
  ▸ Implemented Cohere NLP API for smart insights; designed responsive UI
    and Flask data ingestion endpoints
  ▸ Delivered MVP in 36 hours with 4-person agile team; pitched live
    prototype to judges

════════════════════════════════════════════════════════════════
 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════

Languages:           Python, Java, JavaScript, TypeScript, SQL, C, Rust, Bash, PowerShell
Frameworks:          React, Flask, Express.js, Node.js, REST, GraphQL, Bootstrap
DevOps & Tools:      Docker, CI/CD, Kubernetes, PowerCLI, Ansible, Git, Agile, Nginx
Testing:             PyTest, Jest, Mocha, Selenium, Unit Testing
Databases:           Oracle SQL, PostgreSQL, MySQL, MongoDB
Cloud & Infra:       VMware vSphere/ESXi, Windows Server (AD, WSUS), Ubuntu, CentOS, Azure
Data & ML:           TensorFlow, Scikit-learn, Pandas, NumPy, XGBoost, Reinforcement Learning
Other Tools:         Salesforce CRM, JIRA, ServiceNow, Tableau, Excel (VBA, Pivot Tables)

────────────────────────────────────────────────────────────────
PDF version: /Software%20Eng%20Res.pdf
Type "gui" then navigate to Resume for the full formatted view.
`,
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

🐙 GitHub:    https://github.com/Arfx45
💼 LinkedIn:  https://www.linkedin.com/in/asnath/
✉️  Email:     arnab.snath@gmail.com
📞 Phone:     647-877-6518

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
