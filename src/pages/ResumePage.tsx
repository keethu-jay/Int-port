import { motion } from 'framer-motion'
import generalResumePdf from '../assets/Resume_Keerthana_Jayamoorthy_General.pdf'

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

export default function ResumePage() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1 flex-1 max-w-24 rounded-full bg-gradient-to-r from-transparent to-primary-blue" />
          <motion.h1
            className="font-display text-3xl md:text-4xl font-bold text-primary-blue"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Resume
          </motion.h1>
          <div className="h-1 flex-1 max-w-24 rounded-full bg-gradient-to-l from-transparent to-primary-pink" />
        </div>

        <motion.div
          className="mt-6 rounded-2xl border-2 border-primary-pink bg-primary-pink/20 p-6 md:p-8 overflow-hidden glow-pink"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary-blue via-primary-pink to-pond-moss" />
          <h2 className="font-display text-2xl font-semibold text-primary-pink flex items-center gap-2 relative z-10">
            <span className="w-3 h-3 rounded-full bg-primary-pink" />
            General Resume
          </h2>
          <p className="mt-4 text-page-on-green leading-relaxed relative z-10">
            View or download my current resume below.
          </p>

          <div className="mt-5 relative z-10">
            <div className="relative w-full overflow-hidden rounded-xl bg-page-bg/80 shadow-lg" style={{ paddingTop: '140%' }}>
              <iframe
                src={`${generalResumePdf}#view=FitH&toolbar=0&navpanes=0`}
                className="absolute inset-0 h-full w-full rounded-xl border-0"
                title="Resume preview"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={generalResumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Open PDF
              </a>
              <a
                href={generalResumePdf}
                download
                className="inline-flex items-center justify-center rounded-full bg-primary-pink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Download
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
