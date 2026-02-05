import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

interface ProjectCardModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectCardModal({ project, onClose }: ProjectCardModalProps) {
  if (!project) return null

  const hasVideoDemo = project.hasVideoDemo && !!project.demoUrl

  return (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-page-bg/80 backdrop-blur-sm" aria-hidden />

        <motion.div
          className="relative w-full max-w-md rounded-2xl overflow-hidden bg-page-bg border-2 border-primary-pink/50 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-primary-pink to-pond-moss" />

          <div className="relative aspect-video bg-black">
            {hasVideoDemo ? (
              <video
                src={project.demoUrl}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={project.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-page-on-green">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-page-muted line-clamp-2">
              {project.description}
            </p>

            {/* Always-visible action buttons on solid background */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                >
                  See Demo
                </a>
              )}
              <Link
                to={`/projects/${project.id}`}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-primary-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                See Docs
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full bg-page-bg/90 p-2 text-page-on-green hover:bg-primary-green/30 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
  )
}
