import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HeroContent from '../HeroContent'
import SplineScene from '../SplineScene'
import { SPLINE_SCENES } from '../../config/splineScenes'

function WaterPlane({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const time = state.clock.getElapsedTime()
    const mx = mouse.current.x
    const my = mouse.current.y

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const z = posAttr.getZ(i)
      let y = 0
      y += Math.sin(time + x * 2) * 0.02
      y += Math.cos(time * 0.7 + z * 2) * 0.02
      const dx = x - mx * 2
      const dz = z - my * 2
      const dist = Math.sqrt(dx * dx + dz * dz)
      y += Math.exp(-dist * 2) * Math.sin(time * 4) * 0.15
      posAttr.setY(i, y)
    }
    posAttr.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <meshStandardMaterial
        color="#839958"
        transparent
        opacity={0.85}
        roughness={0.3}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}

function RippleRing({ x, z, delay }: { x: number; z: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const mat = ref.current.material
    if (!mat || Array.isArray(mat)) return
    const t = state.clock.getElapsedTime() - delay
    if (t < 0) return
    const scale = Math.min(t * 2.5, 3)
    ref.current.scale.setScalar(scale)
    ;(mat as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - t * 0.8)
  })
  return (
    <mesh ref={ref} position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.05, 0.15, 32]} />
      <meshBasicMaterial color="#D3968C" transparent opacity={0.9} side={THREE.DoubleSide} />
    </mesh>
  )
}

function PondScene({
  mouse,
  ripples,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  ripples: { x: number; z: number; t: number }[]
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 2]} intensity={1} />
      <WaterPlane mouse={mouse} />
      {ripples.map((r, i) => (
        <RippleRing key={`${r.t}-${i}`} x={r.x} z={r.z} delay={r.t} />
      ))}
    </>
  )
}

export default function HeroPond() {
  const mouse = useRef({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ x: number; z: number; t: number }[]>([])
  const timeRef = useRef(0)

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: 1 - (e.clientY - rect.top) / rect.height - 0.5,
    }
    timeRef.current += 0.4
    const t = timeRef.current
    setRipples((prev) => {
      const next = [...prev, { x: mouse.current.x * 2, z: mouse.current.y * 2, t }]
      return next.slice(-10)
    })
  }, [])

  const useSpline = !!SPLINE_SCENES.pond

  return (
    <section className="relative w-full h-full bg-pond-midnight overflow-hidden">
      {useSpline ? (
        <>
          <div
            className="absolute inset-0 z-0 w-full h-full"
            style={{ minHeight: '100%', minWidth: '100%' }}
          >
            <SplineScene scene={SPLINE_SCENES.pond} className="w-full h-full" />
          </div>
          {/* Lotus Pond color theme overlay: midnight green, moss, dark green, rosy */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(16,86,102,0.5) 0%, rgba(10,51,35,0.35) 40%, rgba(131,153,88,0.2) 70%, rgba(211,150,140,0.15) 100%)',
              mixBlendMode: 'multiply',
            }}
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0" onPointerMove={onPointerMove}>
          <Canvas camera={{ position: [0, 2, 2], fov: 50 }} dpr={[1, 2]}>
            <PondScene mouse={mouse} ripples={ripples} />
          </Canvas>
        </div>
      )}
      <HeroContent theme="pond" />
    </section>
  )
}
