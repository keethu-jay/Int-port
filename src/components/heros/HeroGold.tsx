import HeroContent from '../HeroContent'
import SplineViewerScene from '../SplineViewerScene'

const GOLD_GRADIENT_URL = 'https://prod.spline.design/3f20b8f2-b198-4d07-ba66-e7ece1a6d207/scene.splinecode'

export default function HeroGold() {
  return (
    <section className="relative w-full h-full overflow-hidden bg-gold-chestnut">
      <div className="absolute inset-0 w-full h-full">
        <SplineViewerScene url={GOLD_GRADIENT_URL} className="w-full h-full" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(72,9,3,0.18) 0%, rgba(184,75,18,0.08) 50%, rgba(229,209,164,0.06) 100%)',
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
      <HeroContent theme="gold" />
    </section>
  )
}
