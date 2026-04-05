import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const HEATMAP_CANVA_URL = 'https://canva.link/j4io0ktl0yfktvq'

export default function ResearchNotesPage() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 flex-1 max-w-20 rounded-full bg-gradient-to-r from-transparent to-primary-pink" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-blue">
              Research Notes
            </h1>
            <div className="h-1 flex-1 max-w-20 rounded-full bg-gradient-to-l from-transparent to-primary-blue" />
          </div>

          <article className="rounded-2xl border border-ink-light/50 bg-ink-dark/50 p-6 md:p-8 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-pink mb-2">
              Legal RAG · SAFELAW
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-page-on-green leading-tight">
              When High Similarity Scores Are a Red Flag
            </h2>
            <p className="mt-3 text-sm text-page-muted">
              <Link to="/projects/safelaw" className="text-primary-blue hover:underline">
                SAFELAW project page
              </Link>
            </p>

            <div className="mt-8">
              <a
                href={HEATMAP_CANVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary-pink/60 bg-gradient-to-br from-primary-blue/20 to-primary-pink/15 px-6 py-10 text-center transition hover:border-primary-blue hover:from-primary-blue/30"
              >
                <span className="font-display text-lg font-semibold text-page-on-green">
                  Open evaluation heatmap
                </span>
                <span className="text-sm text-page-muted">Full-resolution figure on Canva (new tab)</span>
              </a>
              <p className="mt-3 text-center text-xs text-page-muted">
                Semantic score vs. expert-rated legal usefulness across retrieval versions V1–V4.
              </p>
            </div>

            <div className="mt-10 space-y-4 text-page-on-green/95 leading-relaxed text-[15px] md:text-base">
              <p>
                SAFELAW surfaces UK precedents while judges draft. We moved from{' '}
                <strong className="text-page-on-green font-semibold">Voyage-law-2</strong> to{' '}
                <strong className="text-page-on-green font-semibold">Kanon-2</strong>—top on{' '}
                <strong className="text-page-on-green font-semibold">MLEB</strong> for UK law (MLEB scores
                how well legal embedding models retrieve the right documents).
              </p>
              <p>
                We still saw{' '}
                <strong className="text-page-on-green font-semibold">verbatim overfitting</strong>: cosine
                similarity <strong className="text-page-on-green font-semibold">≥ 0.85</strong> often meant
                near-duplicate wording, not a legally analogous case. With{' '}
                <strong className="text-page-on-green font-semibold">Prof. Brian Flanagan</strong> (Maynooth)
                we scored retrievals manually and mapped scores vs. usefulness in the heatmap above.
              </p>
              <p>
                <strong className="text-page-on-green font-semibold">V4</strong> (role filtering + context
                tagging) stacked the most useful analogies at the top—not the version with the highest average
                similarity. Next: earlier expert rubrics and harder tests on near-duplicate noise.
              </p>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}
