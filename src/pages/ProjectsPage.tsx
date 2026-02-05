import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import type { Project } from '../data/projects'
import ProjectCardModal from '../components/ProjectCardModal'

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

function TechIcons({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full bg-primary-blue/40 px-2.5 py-1 text-xs font-medium text-white border border-primary-blue/50"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  const isVideoProject = (project: Project) => project.hasVideoDemo

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-1 flex-1 max-w-28 rounded-full bg-gradient-to-r from-transparent to-primary-pink" />
          <motion.h1
            className="font-display text-3xl md:text-4xl font-bold text-primary-blue"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h1>
          <div className="h-1 flex-1 max-w-28 rounded-full bg-gradient-to-l from-transparent to-primary-blue" />
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, i) => {
            const usePink = i % 2 === 1
            const videoProject = isVideoProject(project)
            return (
              <motion.article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (videoProject) {
                    setModalProject(project)
                  } else {
                    navigate(`/projects/${project.id}`)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (videoProject) {
                      setModalProject(project)
                    } else {
                      navigate(`/projects/${project.id}`)
                    }
                  }
                }}
                className="group relative overflow-hidden rounded-2xl border-2 shadow-xl card-lift cursor-pointer"
                style={{
                  borderColor: usePink ? 'rgba(211, 150, 140, 0.7)' : 'rgba(59, 130, 168, 0.7)',
                  background: usePink ? 'rgba(211, 150, 140, 0.15)' : 'rgba(59, 130, 168, 0.15)',
                }}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 z-10"
                  style={{
                    background: usePink
                      ? 'linear-gradient(90deg, #D3968C, #3B82A8)'
                      : 'linear-gradient(90deg, #3B82A8, #D3968C)',
                  }}
                />

                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover overlay only for projects with a video demo */}
                  {videoProject && project.demoUrl && (
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background: usePink
                          ? 'rgba(211, 150, 140, 0.75)'
                          : 'rgba(59, 130, 168, 0.75)',
                      }}
                    >
                      <div className="mx-4 flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-ink-dark/90 p-3 md:flex-row md:p-4">
                        <div className="relative w-full overflow-hidden rounded-xl bg-black md:w-2/3">
                          <video
                            src={project.demoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex w-full flex-col justify-between gap-2 md:w-1/3">
                          <p className="text-xs text-page-on-green/90 leading-snug">
                            {project.id === 'safelaw'
                              ? 'Watch SAFELAW walk through a legal RAG pipeline that anchors LLM outputs in real case law.'
                              : 'See the VisOps dashboard simulate real‑time training metrics and human‑in‑the‑loop tuning.'}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setModalProject(project)
                              }}
                              className="inline-flex items-center justify-center rounded-full bg-primary-blue px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:opacity-90"
                            >
                              See Demo
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/projects/${project.id}`)
                              }}
                              className="inline-flex items-center justify-center rounded-full bg-primary-pink px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:opacity-90"
                            >
                              See Docs
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2
                    className="font-display text-xl font-semibold transition-colors"
                    style={{ color: usePink ? '#D3968C' : '#3B82A8' }}
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-page-on-green/90 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <TechIcons tech={project.tech} />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <AnimatePresence>
          {modalProject && (
            <ProjectCardModal
              key={modalProject.id}
              project={modalProject}
              onClose={() => setModalProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
