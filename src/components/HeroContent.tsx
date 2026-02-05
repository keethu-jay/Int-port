import { motion } from 'framer-motion'

const HEADLINE = 'Bridging AI, Law, and Design'
const SUBHEADLINE = 'CS/AI Student at WPI | AWS Certified Solutions Architect'
const CTA_LABEL = 'View My Work'

interface HeroContentProps {
  theme: 'pond' | 'fig' | 'meadow' | 'gold'
  className?: string
}

const themeStyles = {
  pond: {
    headline: 'text-pond-dark',
    sub: 'text-pond-midnight/90',
    cta: 'bg-pond-moss text-pond-bg hover:bg-pond-dark border-pond-dark/30',
  },
  fig: {
    headline: 'text-fig-palm',
    sub: 'text-fig-basil',
    cta: 'bg-fig-wilted text-white hover:bg-fig-violet border-fig-basil/50',
  },
  meadow: {
    headline: 'text-meadow-espresso',
    sub: 'text-meadow-olive',
    cta: 'bg-meadow-berry text-white hover:bg-meadow-olive border-meadow-espresso/40',
  },
  gold: {
    headline: 'text-gold-chestnut',
    sub: 'text-gold-olive',
    cta: 'bg-gold-copper text-gold-desert hover:bg-gold-caramel border-gold-olive/50',
  },
}

export default function HeroContent({ theme, className = '' }: HeroContentProps) {
  const styles = themeStyles[theme]

  return (
    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 ${className}`}>
      <motion.h1
        className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl ${styles.headline}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {HEADLINE}
      </motion.h1>
      <motion.p
        className={`mt-4 text-lg md:text-xl max-w-xl text-center font-sans font-light ${styles.sub}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {SUBHEADLINE}
      </motion.p>
      <motion.a
        href="#work"
        className={`mt-8 px-8 py-3 rounded-full font-sans font-medium border transition-all duration-300 cursor-pointer ${styles.cta}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {CTA_LABEL}
      </motion.a>
    </div>
  )
}
