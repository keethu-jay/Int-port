import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 4
const SMOOTHNESS_HEAD = 0.35
const SMOOTHNESS_TAIL = 0.45

interface CursorFollowerProps {
  size?: number
  borderSize?: number
}

export default function CursorFollower({
  size = 8,
  borderSize = 32,
}: CursorFollowerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })))
  const velocityRef = useRef({ vx: 0, vy: 0 })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRef = useRef<HTMLDivElement | null>(null)
  const iconRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      velocityRef.current = {
        vx: x - prevMouseRef.current.x,
        vy: y - prevMouseRef.current.y,
      }
      prevMouseRef.current = { x, y }
      mouseRef.current = { x, y }
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.classList.contains('cursor-pointer')
      isHoveringRef.current = isInteractive
    }

    const animate = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      trailRef.current[0].x += (mx - trailRef.current[0].x) * SMOOTHNESS_HEAD
      trailRef.current[0].y += (my - trailRef.current[0].y) * SMOOTHNESS_HEAD

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const s = i === 1 ? SMOOTHNESS_TAIL : SMOOTHNESS_TAIL + i * 0.06
        trailRef.current[i].x += (trailRef.current[i - 1].x - trailRef.current[i].x) * s
        trailRef.current[i].y += (trailRef.current[i - 1].y - trailRef.current[i].y) * s
      }

      velocityRef.current.vx *= 0.92
      velocityRef.current.vy *= 0.92

      const speed = Math.min(Math.hypot(velocityRef.current.vx, velocityRef.current.vy) * 0.06, 0.5)
      const angle = Math.atan2(velocityRef.current.vy, velocityRef.current.vx)
      const stretchX = 1 + speed
      const stretchY = Math.max(0.85, 1 - speed * 0.3)
      const hover = isHoveringRef.current

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const el = segmentRefs.current[i]
        if (!el) continue
        const pos = trailRef.current[i]
        const t = i / (TRAIL_LENGTH - 1)
        const segSize = borderSize * (1 - t * 0.5)
        const opacity = hover && i === 0 ? 1 : 1 - t * 0.65
        const scale = hover && i === 0 ? 1.35 : 1
        el.style.left = pos.x + 'px'
        el.style.top = pos.y + 'px'
        el.style.width = segSize + 'px'
        el.style.height = segSize + 'px'
        el.style.opacity = String(opacity)
        if (i === 0) {
          el.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${scale * stretchX}, ${scale * stretchY}) rotate(${-angle}rad)`
        } else {
          el.style.transform = 'translate(-50%, -50%)'
        }
      }

      const dot = dotRef.current
      if (dot) {
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
        dot.style.transform = `translate(-50%, -50%) scale(${hover ? 1.1 : 1})`
      }

      const icon = iconRef.current
      if (icon) {
        icon.style.left = mx + 6 + 'px'
        icon.style.top = my - 6 + 'px'
        icon.style.transform = 'translate(-50%, -50%)'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', checkInteractive)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', checkInteractive)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [borderSize])

  if (!isVisible) return null

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => { segmentRefs.current[i] = el }}
          className={i === 0 ? 'cursor-glass pointer-events-none fixed z-[9999]' : 'cursor-glass-tail pointer-events-none fixed z-[9999]'}
          style={{
            borderRadius: '50%',
            left: 0,
            top: 0,
            willChange: 'transform',
          }}
        />
      ))}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={iconRef}
        className="pointer-events-none fixed z-[9999] flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <span className="text-yellow-200 text-[18px]">🐝</span>
      </div>
    </>
  )
}
