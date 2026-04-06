import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const HEATMAP_PUBLIC = '/images/safelaw-evaluation-heatmap.png'
const HEATMAP_CANVA_URL = 'https://canva.link/j4io0ktl0yfktvq'

export default function ResearchNotesPage() {
  const [heatmapFailed, setHeatmapFailed] = useState(false)

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
              When High Similarity Scores Are a Red Flag: What Building a Legal RAG System Taught Me About Retrieval
            </h2>
            <p className="mt-3 text-sm text-page-muted">
              <Link to="/projects/safelaw" className="text-primary-blue hover:underline">
                SAFELAW project page
              </Link>
            </p>

            <div className="mt-8">
              {!heatmapFailed ? (
                <figure className="rounded-xl border border-ink-light/40 bg-black/40 overflow-hidden">
                  <img
                    src={HEATMAP_PUBLIC}
                    alt="Heatmap comparing semantic similarity scores to expert-rated legal usefulness across retrieval versions V1 through V4"
                    className="w-full h-auto object-contain"
                    onError={() => setHeatmapFailed(true)}
                  />
                  <figcaption className="px-4 py-3 text-center text-xs text-page-muted border-t border-ink-light/30">
                    Evaluation heatmap: semantic score versus expert-rated usefulness across retrieval
                    versions (author&apos;s figure from the SAFELAW work).
                  </figcaption>
                </figure>
              ) : (
                <a
                  href={HEATMAP_CANVA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary-pink/60 bg-gradient-to-br from-primary-blue/20 to-primary-pink/15 px-6 py-10 text-center transition hover:border-primary-blue hover:from-primary-blue/30"
                >
                  <span className="font-display text-lg font-semibold text-page-on-green">
                    Open evaluation heatmap
                  </span>
                  <span className="text-sm text-page-muted">
                    Add <code className="text-primary-pink">public/images/safelaw-evaluation-heatmap.png</code> to
                    embed the figure here, or open the full-resolution version on Canva (new tab).
                  </span>
                </a>
              )}
            </div>

            <div className="mt-10 space-y-5 text-page-on-green/95 leading-relaxed text-[15px] md:text-base">
              <p>
                I spent three academic terms at Worcester Polytechnic Institute on{' '}
                <strong className="text-page-on-green font-semibold">SAFELAW</strong>, a full-stack{' '}
                <strong className="text-page-on-green font-semibold">RAG</strong> (retrieval-augmented
                generation) system aimed at{' '}
                <strong className="text-page-on-green font-semibold">UK judges</strong> who already have the
                law in front of them but need{' '}
                <strong className="text-page-on-green font-semibold">analogous precedents</strong> while they
                draft opinions. In RAG, you embed a corpus, embed the user&apos;s query, and return the
                nearest neighbors by vector distance; the &quot;generation&quot; piece can be as light as
                surfacing citations or as heavy as drafting assist—we stayed focused on retrieval quality
                because that is where the legal risk lives if the wrong case rises to the top. The inputs are
                real judgments from the UK Supreme Court and Upper Tribunal, pulled through the National
                Archives API. The product question is simple to state and hard to get right: when a judge
                pastes a paragraph of reasoning, what should float to the top of a similarity-ranked list so
                that it is actually useful in court—not just text that looks related to a vector model?
              </p>
              <p>
                We started with a general-purpose legal embedding model and moved to{' '}
                <strong className="text-page-on-green font-semibold">Kanon-2</strong>. The reason was
                benchmarked, not vibes:{' '}
                <strong className="text-page-on-green font-semibold">MLEB</strong> (the Massive Legal
                Embedding Benchmark) is a standardized suite of tasks that measures how often the correct
                legal documents land near the top of a vector search. It is the closest thing this space has
                to a shared scoreboard, so you can compare models without hand-waving. For{' '}
                <strong className="text-page-on-green font-semibold">UK law</strong>, Kanon-2 ranked first on
                MLEB. That switch from our earlier{' '}
                <strong className="text-page-on-green font-semibold">Voyage-law-2</strong> setup was the
                difference between a model that looks good in demos and one that is aligned with how UK
                materials are evaluated in the open literature.
              </p>
              <p>
                Even after that upgrade, we hit{' '}
                <strong className="text-page-on-green font-semibold">verbatim overfitting</strong>. In plain
                terms: the embedding space was so good at matching wording that a high{' '}
                <strong className="text-page-on-green font-semibold">cosine similarity</strong>—think{' '}
                <strong className="text-page-on-green font-semibold">0.85 and above</strong>—often meant the
                retrieved passage was a <em>near-verbatim</em> echo of the query text, not a separate case that
                a lawyer would treat as a meaningful analogy. The model was not “hallucinating” in the usual
                sense; it was faithfully ranking text that looked almost identical in embedding space, which
                is the wrong failure mode when you want independent precedent.
              </p>
              <p>
                To make that visible, we built a{' '}
                <strong className="text-page-on-green font-semibold">manual evaluation framework</strong> with{' '}
                <strong className="text-page-on-green font-semibold">Professor Brian Flanagan</strong> at
                Maynooth University, who works in Irish and UK common law. Human experts rated whether each
                retrieved item was legally useful, independent of what the cosine score said. We then plotted
                those judgments against similarity in{' '}
                <strong className="text-page-on-green font-semibold">heatmaps</strong> across four retrieval
                pipelines we had tuned with different metadata and filtering strategies—same corpus and
                embedding model, different ways of narrowing or tagging candidates before ranking. The figure
                above is exactly that view: where the model&apos;s confidence and the lawyer&apos;s judgment
                diverge.
              </p>
              <p>
                The result was{' '}
                <strong className="text-page-on-green font-semibold">counterintuitive</strong>.{' '}
                <strong className="text-page-on-green font-semibold">Version 4</strong>, a hybrid that combined{' '}
                <strong className="text-page-on-green font-semibold">role filtering</strong> with{' '}
                <strong className="text-page-on-green font-semibold">context tagging</strong>, stacked the
                highest concentration of genuinely analogous cases at the top of the ranked list. It did{' '}
                <em>not</em> win on average cosine similarity across the board. The pipeline that looked best
                on aggregate embedding scores was not the one judges would actually want open beside a draft
                opinion. That is the practical lesson: optimizing for the mean semantic score can hide a failure
                mode where the top of the list is full of echoes, not precedents.
              </p>
              <p>
                If I did it again, I would lock the expert rubric and spot-checks earlier in the build so we
                were not discovering verbatim overlap only after the retrieval stack was frozen; what comes
                next on my side is stress-testing harder against near-duplicate noise and tightening how we
                surface uncertainty when the model is confident for the wrong reason.
              </p>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}
