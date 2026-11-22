export interface ParsedResume {
  rawText: string;
  name: string;
  email: string;
  roleTarget: string;
  skills: string[];
  experienceYears: number;
  projects: string[];
  education: string;
  wordCount: number;
}

export interface SampleResume {
  id: string;
  name: string;
  title: string;
  targetRole: string;
  experienceYears: number;
  highlightBadge: string;
  text: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'fresher-frontend',
    name: 'Aarav Sharma',
    title: 'Frontend Engineer (Fresher / 2025 Grad)',
    targetRole: 'Frontend Developer',
    experienceYears: 1,
    highlightBadge: 'Fresher / React & Next.js',
    text: `AARAV SHARMA
Email: aarav.sharma@example.com | GitHub: github.com/aarav-dev | LinkedIn: linkedin.com/in/aaravsharma
Bengaluru, India

SUMMARY
Passionate Frontend Developer and recent Computer Science graduate with hands-on project experience building responsive, accessible web applications using React, Next.js, TypeScript, and Tailwind CSS. Strong grasp of JavaScript fundamentals, DOM manipulation, asynchronous programming, and state management.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
- Frameworks & Libraries: React 19, Next.js 14, Tailwind CSS, Redux Toolkit, React Query, Framer Motion
- Tools & Platforms: Git, GitHub, Vite, Postman, Vercel, Supabase, Jest, Figma
- Concepts: Responsive Web Design, Component Lifecycle, RESTful APIs, Web Accessibility (a11y), Performance Optimization

PROJECTS
1. ShopPulse - Modern E-Commerce Platform (React, TypeScript, Tailwind, Stripe)
- Engineered a high-performance single page application with product search, multi-filter catalog, dynamic cart state, and mock checkout flow.
- Reduced initial page load time by 38% through lazy loading, image optimization, and code splitting.
- Implemented real-time inventory counter and optimistic UI updates for smooth user feedback.

2. DevSnippet - Code Snippet Sharing & Collaboration Tool (Next.js, Supabase, Monaco Editor)
- Built an interactive developer notebook allowing users to save, tag, and fork syntax-highlighted code snippets.
- Integrated Supabase Auth and Row Level Security (RLS) for protected user profiles and private snippet vaults.
- Added live preview execution for HTML/CSS/JavaScript with sandbox iframe security.

3. CampusPulse - University Event & Hackathon Portal (React, Firebase)
- Created event registration portal used by 1,200+ students across campus hackathons.
- Integrated automated email confirmations and QR code check-in scanner for attendees.

EDUCATION
Bachelor of Technology in Computer Science & Engineering
National Institute of Technology (NIT) | CGPA: 8.6/10 (2021 - 2025)`
  },
  {
    id: 'fullstack-senior',
    name: 'Priya Patel',
    title: 'Senior Full Stack Engineer (4+ Years Exp)',
    targetRole: 'Full Stack Engineer',
    experienceYears: 4,
    highlightBadge: 'Senior / Node, Postgres & AWS',
    text: `PRIYA PATEL
Email: priya.patel@example.com | LinkedIn: linkedin.com/in/priyapatel-tech | Portfolio: priyapatel.dev
San Francisco, CA / Remote

SUMMARY
Senior Full Stack Engineer with 4+ years of expertise architecting high-scale distributed applications, microservices, and reactive user interfaces. Proven track record leading architectural migrations, optimizing database queries for millions of records, and delivering mission-critical SaaS platforms.

CORE COMPETENCIES
- Frontend: React, TypeScript, Next.js, Redux Toolkit, WebSockets, Tailwind CSS, Vite
- Backend: Node.js, Express, NestJS, Go (Golang), Python, REST APIs, GraphQL, gRPC
- Databases & Caching: PostgreSQL, MongoDB, Redis, DynamoDB, Elasticsearch, Prisma ORM
- Cloud & DevOps: AWS (ECS, Lambda, S3, RDS, CloudFront), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions)
- Architecture: Microservices, Event-Driven Architecture (Kafka, RabbitMQ), System Design, Scalability, High Availability

PROFESSIONAL EXPERIENCE
Senior Full Stack Engineer | CloudScale Systems (2022 - Present)
- Architected and led the migration of a legacy monolithic billing system to event-driven microservices using Node.js, Apache Kafka, and PostgreSQL, cutting API latency by 45%.
- Implemented distributed Redis caching and read-replica routing that supported a 3.2x traffic surge during Black Friday (processing 18,000 requests/sec).
- Mentored a cohort of 6 mid-level engineers on automated testing, clean architecture, and pull request reviews.

Software Engineer | FinFlow Analytics (2020 - 2022)
- Built interactive financial analytics dashboard using React, TypeScript, and D3.js visualizing multi-million transaction ledgers in sub-100ms render times.
- Designed secure idempotent payment webhooks handling Stripe, PayPal, and ACH payouts with zero transaction discrepancies.

EDUCATION & CERTIFICATIONS
B.S. in Software Engineering, University of Washington (2020)
AWS Certified Solutions Architect – Associate`
  },
  {
    id: 'ai-ml-engineer',
    name: 'Rohan Mehta',
    title: 'AI / Machine Learning Engineer (3 Years Exp)',
    targetRole: 'Machine Learning Engineer',
    experienceYears: 3,
    highlightBadge: 'AI & LLMs / PyTorch & LangChain',
    text: `ROHAN MEHTA
Email: rohan.mehta@example.com | GitHub: github.com/rohan-ml | LinkedIn: linkedin.com/in/rohanmehta-ai
Seattle, WA

PROFESSIONAL SUMMARY
Machine Learning Engineer specializing in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) architectures, and production model deployment. Experienced in fine-tuning open weights models, building semantic search engines, and optimizing inference pipelines.

TECHNICAL SKILLS
- ML / AI Frameworks: PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LlamaIndex, vLLM
- Languages & Backends: Python, C++, TypeScript, FastAPI, Flask, Ray
- Vector DBs & Search: Pinecone, Qdrant, ChromaDB, Milvus, Weaviate, FAISS
- Data Engineering & Ops: MLflow, Weights & Biases, Docker, Kubernetes, AWS SageMaker, Triton Inference Server

EXPERIENCE
Machine Learning Engineer | CogniWave AI (2022 - Present)
- Built production enterprise RAG pipeline indexing 4M+ internal documents using Qdrant vector database and hybrid dense/sparse BM25 retrieval.
- Reduced model inference latency by 62% using TensorRT-LLM and 4-bit AWQ quantization on NVIDIA A10G GPUs.
- Designed automated hallucination evaluation framework and guardrails using G-Eval metrics.

Data Scientist | DeepSense Labs (2021 - 2022)
- Trained multi-modal classification models on 500k+ medical imaging datasets achieving 94.2% ROC-AUC.
- Implemented automated ETL data pipelines with Apache Spark and MLflow model registry.

EDUCATION
Master of Science in Artificial Intelligence, Carnegie Mellon University (2021)`
  },
  {
    id: 'product-manager',
    name: 'Ananya Sen',
    title: 'Technical Product Manager',
    targetRole: 'Product Manager',
    experienceYears: 4,
    highlightBadge: 'Product / B2B SaaS & Metrics',
    text: `ANANYA SEN
Email: ananya.sen@example.com | LinkedIn: linkedin.com/in/ananyasen-pm | Austin, TX

SUMMARY
Data-driven Technical Product Manager with 4+ years leading cross-functional teams across engineering, UX design, and data science to ship B2B enterprise SaaS solutions. Proven record growing ARR from $1.2M to $5.8M through customer discovery, agile execution, and growth loops.

SKILLS & SPECIALIZATIONS
- Product Strategy: Roadmap Planning, PRD Writing, OKRs, User Journey Mapping, Jobs-To-Be-Done (JTBD)
- Analytics & Metrics: Mixpanel, Amplitude, SQL, Google Analytics, A/B Testing, Cohort Retention
- Technical Understanding: System Architecture, REST APIs, Cloud Infrastructure, Database Modeling, Agile/Scrum
- Collaboration: Jira, Confluence, Linear, Figma, ProductBoard

EXPERIENCE
Product Manager | NexaCloud Enterprise (2022 - Present)
- Led end-to-end product discovery and launch of NexaConnect developer API platform, onboarding 320+ enterprise customers within 6 months.
- Spearheaded self-serve onboarding redesign that improved trial-to-paid conversion by 28%.
- Ran bi-weekly sprint planning, backlog grooming, and customer discovery sessions with Fortune 500 tech leads.

Associate Product Manager | VentureScale (2020 - 2022)
- Drove product experimentations on user checkout funnel, lifting checkout completion rates by 14%.
- Conducted 60+ in-depth user interviews to identify high-value feature opportunities.

EDUCATION
B.S. in Computer Science & Business Administration, University of Texas at Austin`
  }
];

// Heuristic extractor to parse skills, names, and contact details from any raw text
export function parseResumeContent(text: string): ParsedResume {
  const clean = text.trim();
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract candidate name (usually top line)
  const name = lines[0] ? lines[0].replace(/[^a-zA-Z\s]/g, '').slice(0, 40) : 'Candidate';

  // Extract email
  const emailMatch = clean.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
  const email = emailMatch ? emailMatch[1] : 'candidate@example.com';

  // Comprehensive tech keywords dictionary
  const skillKeywords = [
    'React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind',
    'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'C++',
    'Go', 'Golang', 'Rust', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'GraphQL', 'REST API', 'Git', 'Kafka', 'CI/CD', 'Microservices',
    'System Design', 'PyTorch', 'TensorFlow', 'LLM', 'Machine Learning', 'Agile', 'Scrum', 'SQL',
    'Jest', 'Unit Testing', 'Figma', 'Redux', 'Supabase', 'Firebase', 'Linux'
  ];

  const lowerText = clean.toLowerCase();
  const detectedSkills = skillKeywords.filter(skill => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(lowerText);
  });

  // Estimate experience years
  let experienceYears = 1;
  const expMatches = clean.match(/(\d+)\+?\s*(?:years?|yrs?)/gi);
  if (expMatches && expMatches.length > 0) {
    const numbers = expMatches.map(m => parseInt(m, 10)).filter(n => !isNaN(n) && n < 30);
    if (numbers.length > 0) {
      experienceYears = Math.max(...numbers);
    }
  }

  // Extract project bullet candidates
  const projectLines = lines.filter(l => 
    l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.') || 
    l.startsWith('•') || l.startsWith('-') || /project/i.test(l)
  ).slice(0, 5);

  const wordCount = clean.split(/\s+/).length;

  // Detect likely target role
  let roleTarget = 'Software Engineer';
  if (/machine learning|pytorch|tensorflow|deep learning|data scientist/i.test(clean)) {
    roleTarget = 'Machine Learning Engineer';
  } else if (/product manager|roadmap|prd|jtbd|okrs/i.test(clean)) {
    roleTarget = 'Product Manager';
  } else if (/frontend|react|ui\/ux|css|next\.js/i.test(clean) && !/microservices|kafka/i.test(clean)) {
    roleTarget = 'Frontend Developer';
  } else if (/full\s*stack|backend|microservices|distributed/i.test(clean)) {
    roleTarget = 'Full Stack Engineer';
  }

  return {
    rawText: clean,
    name,
    email,
    roleTarget,
    skills: detectedSkills.length > 0 ? detectedSkills : ['JavaScript', 'React', 'Problem Solving', 'Git'],
    experienceYears,
    projects: projectLines.length > 0 ? projectLines : ['Full Stack Web Application', 'API Integration Project'],
    education: 'University Degree in Computer Science or Equivalent',
    wordCount
  };
}

// Extract text from dropped or selected file
export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'txt' || extension === 'md' || extension === 'json') {
    return await file.text();
  }

  if (extension === 'pdf') {
    // Read raw buffer and extract readable text chunks
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let text = '';
      let currentWord = '';
      
      // Fast UTF-8/ASCII stream parser for PDF streams
      for (let i = 0; i < bytes.length; i++) {
        const c = bytes[i];
        if ((c >= 32 && c <= 126) || c === 10 || c === 13) {
          currentWord += String.fromCharCode(c);
        } else {
          if (currentWord.length > 2 && !/^[0-9\s/]+$/.test(currentWord)) {
            text += currentWord + ' ';
          }
          currentWord = '';
        }
      }
      
      // Clean up PDF binary syntax artifacts (e.g. stream, obj, xref, flatedecode)
      const sanitized = text
        .replace(/<<(?:(?!>>).)*>>/g, ' ')
        .replace(/(?:obj|endobj|stream|endstream|xref|trailer|startxref)/gi, ' ')
        .replace(/\\[0-9]{3}/g, ' ')
        .replace(/BT\s+/g, ' ')
        .replace(/\s+ET/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (sanitized.length > 80) {
        return sanitized;
      }
    } catch (e) {
      console.warn('PDF stream extraction encountered an issue, reading as plain text:', e);
    }
    return await file.text();
  }

  // Default fallback for DOCX or binary
  return await file.text();
}
