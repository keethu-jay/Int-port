import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projects'

const fadeIn = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.02-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.09 9.09 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.64.72 1.02 1.63 1.02 2.75 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 3.5A2.5 2.5 0 0 1 12.5 1H15a2.5 2.5 0 0 1 0 5h-1.5V9H15a2.5 2.5 0 0 1 0 5h-1.5v1.5A3.5 3.5 0 1 1 9 12.5V12H7A2.5 2.5 0 0 1 7 7h2V3.5Z"
      />
    </svg>
  )
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? PROJECTS.find((p) => p.id === id) : undefined
  const [techMd, setTechMd] = useState<string | null>(null)
  const [showReadme, setShowReadme] = useState(false)
  const [slidePage, setSlidePage] = useState(1)
  const [viewCount, setViewCount] = useState<number | null>(null)

  useEffect(() => {
    if (!project?.techMdUrl) return
    fetch(project.techMdUrl)
      .then((r) => (r.ok ? r.text() : null))
      .then(setTechMd)
      .catch(() => setTechMd(null))
  }, [project?.techMdUrl])

  useEffect(() => {
    if (!project) return
    const key = `projectViews:${project.id}`
    try {
      const raw = window.localStorage.getItem(key)
      const prev = raw ? Number(raw) || 0 : 0
      const next = prev + 1
      window.localStorage.setItem(key, String(next))
      setViewCount(next)
    } catch {
      setViewCount(null)
    }
  }, [project])

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-24 pb-16">
        <p className="text-page-muted">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-primary-blue hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  const copyDemoUrl = () => {
    if (project.demoUrl) {
      navigator.clipboard.writeText(project.demoUrl)
    }
  }

  const isVideoProject = project.hasVideoDemo && !!project.demoUrl
  const hasPaper = !!project.paperUrl
  const hasSlides = !!project.slidesUrl

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-pink hover:text-primary-blue transition-colors pb-2 border-b-2 border-primary-pink hover:border-primary-blue"
          >
            ← Back to Projects
          </Link>

          <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold text-primary-blue flex items-center gap-3">
            <span className="w-2 h-12 rounded-full bg-gradient-to-b from-primary-blue to-primary-pink" />
            {project.title}
          </h1>

          {viewCount !== null && (
            <div className="mt-2 flex items-center gap-2 text-xs text-page-muted">
              <EyeIcon />
              <span>
                {viewCount} view{viewCount === 1 ? '' : 's'}
              </span>
            </div>
          )}

          {/* Hero media: video demo replaces cover; interactive demo for hospital; otherwise thumbnail */}
          {isVideoProject && project.demoUrl ? (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border-2 border-primary-pink/60 bg-black shadow-xl">
              <video
                src={project.demoUrl}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-primary-blue px-4 py-2.5 text-white shadow-lg shadow-primary-blue/30">
                <button
                  type="button"
                  onClick={copyDemoUrl}
                  className="rounded p-1 hover:bg-white/20"
                  title="Copy demo URL"
                  aria-label="Copy demo URL"
                >
                  <CopyIcon />
                </button>
                <span className="text-xs font-medium uppercase tracking-wide">Demo video</span>
              </div>
            </div>
          ) : project.id === 'hospital-management' && project.demoUrl ? (
            <section className="mt-8 rounded-2xl border-2 border-primary-pink/60 bg-ink-dark/80 p-4 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <h2 className="font-display text-lg font-semibold text-primary-blue mb-3">
                    Interactive Demo
                  </h2>
                  <div className="relative w-full overflow-hidden rounded-xl bg-page-bg/60 shadow-lg" style={{ paddingTop: '75%' }}>
                    <iframe
                      src={project.demoUrl}
                      className="absolute inset-0 h-full w-full rounded-xl border-0"
                      title="Hospital Service System interactive demo"
                      allow="fullscreen"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Open in new tab
                    </a>
                    <button
                      type="button"
                      onClick={copyDemoUrl}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-pink/20 px-4 py-2 text-sm font-medium text-primary-pink hover:bg-primary-pink/30"
                      title="Copy demo URL"
                    >
                      <CopyIcon />
                      Copy link
                    </button>
                  </div>
                </div>
                <div className="lg:w-80 flex-shrink-0">
                  <h2 className="font-display text-lg font-semibold text-primary-pink mb-3">
                    User Guide
                  </h2>
                  <ul className="space-y-3 text-sm text-page-on-green">
                    <li>
                      <span className="font-semibold text-primary-blue">Directions Page:</span>{' '}
                      Generate step-by-step navigation between specific indoor nodes to find any location within the building.
                    </li>
                    <li>
                      <span className="font-semibold text-primary-blue">Request Service:</span>{' '}
                      Submit maintenance or assistance requests for specific locations; admins can view and manage these in the All Requests dashboard.
                    </li>
                    <li>
                      <span className="font-semibold text-primary-blue">Community Forum:</span>{' '}
                      Post questions and engage in threaded discussions with other users.
                    </li>
                    <li>
                      <span className="font-semibold text-primary-pink">Directory Management (Admin Only):</span>{' '}
                      Bulk-edit the hospital database by importing/exporting CSVs; all changes reflect instantly across the site.
                    </li>
                    <li>
                      <span className="font-semibold text-primary-pink">Map Editor (Admin Only):</span>{' '}
                      A visual tool to add or relocate nodes, updating the building&apos;s digital twin in real-time.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          ) : (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border-2 border-primary-pink/40 bg-ink-mid/10 shadow-xl">
              <img
                src={project.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <p className="mt-6 text-page-muted leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-primary-blue/30 px-2.5 py-1 text-sm font-medium text-page-on-green"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.githubUrl || project.figmaUrl) && (
            <div className="mt-4 flex items-center gap-3 text-xs text-page-muted">
              <span className="uppercase tracking-wide">Links</span>
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary-blue/15 p-1.5 text-primary-blue hover:bg-primary-blue/25"
                    title="Open GitHub repository"
                    aria-label="Open GitHub repository"
                  >
                    <GithubIcon />
                  </a>
                )}
                {project.figmaUrl && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary-pink/15 p-1.5 text-primary-pink hover:bg-primary-pink/25"
                    title="Open Figma case study"
                    aria-label="Open Figma case study"
                  >
                    <FigmaIcon />
                  </a>
                )}
              </div>
            </div>
          )}

          {techMd && (
            <motion.section
              layout
              className="mt-10 rounded-2xl border border-ink-light/60 bg-ink-dark/95 p-4 cursor-pointer overflow-hidden shadow-sm"
              onClick={() => setShowReadme((v) => !v)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary-blue" />
                  <p className="font-display text-sm font-semibold text-primary-blue">
                    Read me
                  </p>
                </div>
                <span className="text-xs text-page-muted">
                  {showReadme ? 'Click to collapse' : 'Click to expand'}
                </span>
              </div>
              {showReadme && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <pre className="whitespace-pre-wrap rounded-lg bg-black/90 p-4 font-mono text-sm text-white max-h-80 overflow-auto border border-ink-light/30">
                    {techMd}
                  </pre>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* SAFELAW-specific related research links */}
          {project.id === 'safelaw' && (
            <section className="mt-8 rounded-2xl border border-ink-light/50 bg-ink-dark/70 p-4">
              <h2 className="font-display text-lg font-semibold text-primary-blue">
                Related research
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-page-muted">
                <li>
                  <a
                    href="https://dl.acm.org/doi/10.1145/3706598.3713974"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-pink hover:underline"
                  >
                    CorpusStudios: Authorial Workflows for Controlling Legal AI Systems
                  </a>
                </li>
                <li>
                  <a
                    href="https://arxiv.org/abs/2401.10873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-pink hover:underline"
                  >
                    GP-TSM: An AI-Resilient Text Rendering Technique for Reading and Skimming Documents
                  </a>
                </li>
              </ul>
            </section>
          )}

          {/* Paper viewer with inline reading + download */}
          {hasPaper && project.paperUrl && (
            <section className="mt-10 grid gap-4 md:grid-cols-[minmax(0,2fr)_auto] items-start">
              <div className="rounded-2xl border border-ink-light/40 bg-ink-dark/70 p-3">
                <h2 className="font-display text-lg font-semibold text-primary-blue">
                  Paper
                </h2>
                <div className="mt-3 relative w-full overflow-hidden rounded-xl bg-page-bg/60" style={{ paddingTop: '140%' }}>
                  <iframe
                    src={`${project.paperUrl}#view=FitH&toolbar=0&navpanes=0`}
                    className="absolute inset-0 h-full w-full rounded-xl border-0"
                    title={`${project.title} paper preview`}
                  />
                </div>
                <p className="mt-3 text-xs text-page-muted">
                  Scroll inside the viewer to read the paper without downloading.
                </p>
              </div>
              <div className="flex md:flex-col gap-3 md:items-end">
                <a
                  href={project.paperUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <DownloadIcon />
                  Download paper
                </a>
              </div>
            </section>
          )}

          {/* Slides viewer with left/right navigation + download */}
          {hasSlides && project.slidesUrl && (
            <section className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-primary-blue">
                  Slides
                </h2>
                <div className="flex items-center gap-3 text-xs text-page-muted">
                  <button
                    type="button"
                    onClick={() => setSlidePage((p) => Math.max(1, p - 1))}
                    className="rounded-full border border-primary-blue/60 bg-transparent px-3 py-1 font-semibold text-primary-blue hover:bg-primary-blue/10 disabled:opacity-40"
                    disabled={slidePage === 1}
                  >
                    ◀
                  </button>
                  <span>
                    Page {slidePage}
                    {typeof project.slidesPageCount === 'number' && ` of ${project.slidesPageCount}`}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSlidePage((p) =>
                        typeof project.slidesPageCount === 'number'
                          ? Math.min(project.slidesPageCount, p + 1)
                          : p + 1
                      )
                    }
                    className="rounded-full border border-primary-pink/60 bg-transparent px-3 py-1 font-semibold text-primary-pink hover:bg-primary-pink/10 disabled:opacity-40"
                    disabled={typeof project.slidesPageCount === 'number' && slidePage >= project.slidesPageCount}
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-ink-light/40 bg-ink-dark/70 p-3">
                <div className="relative w-full overflow-hidden rounded-xl bg-page-bg/60" style={{ paddingTop: '62.5%' }}>
                  <iframe
                    key={slidePage}
                    src={`${project.slidesUrl}#page=${slidePage}&view=FitH&toolbar=0&navpanes=0`}
                    className="absolute inset-0 h-full w-full rounded-xl border-0"
                    title={`${project.title} slides preview`}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-page-muted">
                    Use the arrows above or scroll inside the viewer to move through the slides.
                  </p>
                  <a
                    href={project.slidesUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    <DownloadIcon />
                    Download slides
                  </a>
                </div>
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  )
}
