import safelawVideo from '../assets/SAFELAW Video Demo.mp4'
import visopsVideo from '../assets/MLOps Dashboard Demo.mp4'
import medBrVideo from '../assets/Med-br demo.mp4'
import medBrPaper from '../assets/MED-BR Final Paper.pdf'
import medBrSlides from '../assets/Better Business Planner Public.pdf'
import adversarialSlides from '../assets/Facial Recognition Report Slides (1).pdf'
import medBrCover from '../assets/med-br cover.png'
import adversarialCover from '../assets/adversarial cover.png'
import safelawCover from '../assets/safelaw cover.png'
import visopsCover from '../assets/visOps cover.png'
import hospitalCover from '../assets/hospitak cover.png'

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  tech: string[]
  demoUrl?: string
  docsUrl?: string
  techMdUrl?: string
  paperUrl?: string
  slidesUrl?: string
  hasVideoDemo?: boolean
  slidesPageCount?: number
  githubUrl?: string
  figmaUrl?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'safelaw',
    title: 'SAFELAW: RAG-Based Legal Analysis Framework',
    description: 'Retrieval‑augmented legal analysis framework that grounds LLM outputs in case law while enforcing fairness and transparency constraints.',
    thumbnail: safelawCover,
    tech: ['Python', 'RAG', 'LLMs', 'NLP', 'Vector DB', 'LangChain'],
    techMdUrl: '/projects/safelaw/tech.md',
    demoUrl: safelawVideo,
    hasVideoDemo: true,
    githubUrl: 'https://github.com/keethu-jay/SAFELAW',
  },
  {
    id: 'med-br',
    title: 'MED-BR: Multi-modal Equity-Driven Business Recommender',
    description: 'Equity‑driven business expansion recommender for Boston that uses GNNs on multi‑modal urban data to optimize both profitability and social equity.',
    thumbnail: medBrCover,
    tech: ['Python', 'PyTorch', 'GNN', 'PostgreSQL', 'GeoPandas'],
    techMdUrl: '/projects/med-br/tech.md',
    paperUrl: medBrPaper,
    slidesUrl: medBrSlides,
    slidesPageCount: 27,
    demoUrl: medBrVideo,
    hasVideoDemo: true,
    githubUrl: 'https://github.com/keethu-jay/MED-BR',
  },
  {
    id: 'adversarial-security-audit',
    title: 'Adversarial Security Audit of Biometric Systems',
    description: 'Security audit of FaceNet that reveals demographic disparities and a “vulnerability inversion” in adversarial robustness across age groups.',
    thumbnail: adversarialCover,
    tech: ['Python', 'TensorFlow/Keras', 'Adversarial ML', 'FGSM', 'PGD', 'ART'],
    techMdUrl: '/projects/adversarial-security-audit/tech.md',
    slidesUrl: adversarialSlides,
    slidesPageCount: 23,
    githubUrl: 'https://github.com/keethu-jay/Facial-Recognition-Flaws',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Service System',
    description: 'Cloud‑based hospital service system built with the PERN stack to manage resources with authentication, validation, and role‑based access control.',
    thumbnail: hospitalCover,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Prisma'],
    techMdUrl: '/projects/hospital-management/tech.md',
    demoUrl: 'https://hospitalsofteng-cz479xzyj-keethu-jayamoorthys-projects.vercel.app/',
    githubUrl: 'https://github.com/keethu-jay/SoftEng-Personal-Project',
  },
  {
    id: 'visops-mlops-dashboard',
    title: 'VisOps: MLOps Dashboard Prototype',
    description: 'High‑fidelity MLOps dashboard prototype that visualizes training dynamics and simulates human‑in‑the‑loop hyperparameter tuning and run summaries.',
    thumbnail: visopsCover,
    tech: ['Figma', 'MLOps', 'UX', 'AWS', 'Data Viz'],
    techMdUrl: '/projects/visops-mlops-dashboard/tech.md',
    demoUrl: visopsVideo,
    hasVideoDemo: true,
    figmaUrl: 'https://www.figma.com/design/XNQdUoAOeqqlHSB6wYyB3D/High-Fidelity?node-id=3-3&t=DtVlOqkGv62i5w79-1',
  },
]
