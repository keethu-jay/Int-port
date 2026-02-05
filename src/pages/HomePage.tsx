import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroBg from '../assets/Jungle-bg.png'

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative z-10 max-w-3xl w-full text-center space-y-6"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
          Keerthana Jayamoorthy
        </h1>
        <p className="text-base md:text-xl font-semibold text-white max-w-xl mx-auto">
          AI Engineer &amp; Software Developer focused on Human–Computer Interaction
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Link
            to="/about"
            className="btn-neon-pink inline-flex rounded-full border border-white/60 bg-primary-pink/90 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-primary-pink hover:border-white transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="btn-neon-pink inline-flex rounded-full border border-white/60 bg-primary-pink/90 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-primary-pink hover:border-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="btn-neon-pink inline-flex rounded-full border border-white/60 bg-primary-pink/90 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-primary-pink hover:border-white transition-colors"
          >
            Portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
