import { motion } from 'framer-motion'
import { useState } from 'react'
import profilePic from '../assets/Profile pic.png'

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const CONTACT_EMAIL = 'keerthana.sa.jayamoorthy@gmail.com'

function GithubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.02-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.09 9.09 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.64.72 1.02 1.63 1.02 2.75 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 6.5A2.44 2.44 0 1 1 4.5 4.06 2.44 2.44 0 0 1 6.94 6.5ZM4.75 8.5h4.3v11h-4.3Zm6.65 0h4.12v1.5h.06c.57-1.02 1.95-2.1 4.02-2.1 4.3 0 5.1 2.83 5.1 6.5v5.1h-4.3v-4.52c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.6h-4.3Z"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 12l8-5.99V6H4Zm0 12h16V9.25l-8 6-8-6V18Z"
      />
    </svg>
  )
}

const SKILLS = [
  'Python',
  'PyTorch',
  'TensorFlow/Keras',
  'LangChain',
  'RAG pipelines',
  'Graph Neural Networks',
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Prisma',
  'MLOps',
  'AWS',
  'Google Maps API',
  'Auth0',
  'Figma',
  'UI/UX Design',
]

const CERTIFICATIONS = [
  'AWS Certified Solutions Architect – Associate',
  'AWS Certified Cloud Practitioner',
  'AWS Certified AI Practitioner',
  'Microsoft Certified: Azure Fundamentals',
]

export default function AboutPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent('Portfolio contact')
    const body = encodeURIComponent(
      `From: ${formState.name} <${formState.email}>\n\n${formState.message}`,
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-2xl px-6 pt-24 pb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="accent-line h-14 rounded-full" />
          <motion.h1
            className="font-display text-3xl md:text-4xl font-bold text-primary-pink"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.h1>
        </div>

        <motion.section
          className="section-blue rounded-2xl px-6 py-6 border-l-4 border-primary-blue text-page-on-green leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="shrink-0">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-primary-pink overflow-hidden shadow-lg shadow-primary-pink/40">
                <img
                  src={profilePic}
                  alt="Portrait of Keethu Jayamoorthy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-primary-blue text-lg">Keethu Jayamoorthy</p>
              <p className="mt-1 text-page-on-green">
                BS/MS in Computer Science &amp; Artificial Intelligence · Worcester Polytechnic Institute · Based in
                Massachusetts
              </p>
            </div>
          </div>
          <p className="mt-6 text-base">
            I&apos;m focused on finding thoughtful, genuinely helpful ways to use AI in the real world—from legal
            tools to urban planning and hospital systems. I care about clarity, fairness, and building systems that
            people actually enjoy using.
          </p>
          <p className="mt-3 text-base">
            I&apos;m a fast learner and always curious about new technologies, and I love collaborating across
            disciplines to turn messy ideas into concrete prototypes and products.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/keethu-jay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-blue/15 px-3 py-1.5 text-sm font-medium text-primary-blue hover:bg-primary-blue/25"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/keerthanajayamoorthy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-blue/15 px-3 py-1.5 text-sm font-medium text-primary-blue hover:bg-primary-blue/25"
            >
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary-pink/15 px-3 py-1.5 text-sm font-medium text-primary-pink hover:bg-primary-pink/25"
            >
              <MailIcon />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </motion.section>

        <motion.section
          className="mt-10 rounded-2xl border border-primary-blue/40 bg-page-bg/60 p-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="font-display text-xl font-semibold text-primary-blue">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary-blue/20 px-3 py-1 text-xs font-semibold text-page-on-green border border-primary-blue/40"
              >
                {skill}
              </span>
            ))}
          </div>
          {CERTIFICATIONS.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-semibold text-primary-pink uppercase tracking-wide">
                Certifications
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full bg-primary-pink/20 px-3 py-1 text-xs font-semibold text-page-on-green border border-primary-pink/40"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </>
          )}
        </motion.section>

        <motion.section
          className="mt-16 rounded-2xl border-2 border-primary-pink bg-primary-pink/20 p-8 glow-pink relative overflow-hidden group"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Transparent overlay on hover */}
          <div className="absolute inset-0 bg-primary-pink/0 group-hover:bg-primary-pink/15 transition-colors duration-300 pointer-events-none" aria-hidden />
          <h2 className="font-display text-2xl font-semibold text-primary-pink flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-pink" />
            Contact
          </h2>
          {sent ? (
            <p className="mt-6 text-primary-blue font-semibold">
              Thanks! Your email draft has been opened in your mail client.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5 relative">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-page-on-green mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full rounded-xl border-2 border-primary-blue/60 bg-page-bg/40 px-4 py-3 text-page-on-green placeholder-page-muted focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/40 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-page-on-green mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-xl border-2 border-primary-blue/60 bg-page-bg/40 px-4 py-3 text-page-on-green placeholder-page-muted focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/40 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-page-on-green mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full rounded-xl border-2 border-primary-blue/60 bg-page-bg/40 px-4 py-3 text-page-on-green placeholder-page-muted focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/40 transition-all resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary-blue px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_28px_rgba(59,130,168,0.5)] relative overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/25 transition-colors" aria-hidden />
                <span className="relative">Send</span>
              </button>
            </form>
          )}
        </motion.section>
      </div>
    </div>
  )
}
