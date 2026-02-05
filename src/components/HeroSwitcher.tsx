import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroPond from './heros/HeroPond'
import HeroFig from './heros/HeroFig'
import HeroMeadow from './heros/HeroMeadow'
import HeroGold from './heros/HeroGold'

export type HeroId = 'pond' | 'fig' | 'meadow' | 'gold'

const HERO_CONFIG: { id: HeroId; label: string; short: string }[] = [
  { id: 'pond', label: 'The Lotus Pond', short: 'Pond' },
  { id: 'fig', label: 'The Fig & Clay', short: 'Fig' },
  { id: 'meadow', label: 'The Wildflower Meadow', short: 'Meadow' },
  { id: 'gold', label: 'The Golden Hour', short: 'Gold' },
]

export default function HeroSwitcher() {
  const [active, setActive] = useState<HeroId>('pond')

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {active === 'pond' && <HeroPond key="pond" />}
        {active === 'fig' && <HeroFig key="fig" />}
        {active === 'meadow' && <HeroMeadow key="meadow" />}
        {active === 'gold' && <HeroGold key="gold" />}
      </AnimatePresence>

      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
        {HERO_CONFIG.map(({ id, short }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              active === id
                ? 'bg-white/30 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/15 hover:text-white'
            }`}
          >
            {short}
          </button>
        ))}
      </nav>
    </div>
  )
}
