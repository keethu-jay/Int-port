import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HeroContent from '../HeroContent'
import SplineScene from '../SplineScene'
import { SPLINE_SCENES } from '../../config/splineScenes'

const SEGMENTS = 40
const REST_DISTANCE = 0.08

function YarnString({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const points = useRef(
    Array.from({ length: SEGMENTS + 1 }, (_, i) => ({
      x: (i / SEGMENTS - 0.5) * 3,
      y: 0.5,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
    }))
  )
  useFrame(() => {
    const mx = mouse.current.x * 2
    const my = mouse.current.y * 2

    for (let i = 0; i <= SEGMENTS; i++) {
      const p = points.current[i]
      const dx = mx - p.x
      const dy = my - p.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
      const force = Math.min(0.02, 0.3 / (dist + 0.5))
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force
      p.vx *= 0.92
      p.vy *= 0.92
      p.x += p.vx
      p.y += p.vy
    }

    for (let k = 0; k < 6; k++) {
      for (let i = 0; i < SEGMENTS; i++) {
        const a = points.current[i]
        const b = points.current[i + 1]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dz = b.z - a.z
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001
        const diff = (REST_DISTANCE * (SEGMENTS / 3) - len) / len
        const offX = dx * diff * 0.5
        const offY = dy * diff * 0.5
        const offZ = dz * diff * 0.5
        if (i > 0) {
          a.x -= offX
          a.y -= offY
          a.z -= offZ
        }
        if (i < SEGMENTS - 1) {
          b.x += offX
          b.y += offY
          b.z += offZ
        }
      }
    }
  })

  const lineObject = useMemo(() => {
    const pos = new Float32Array((SEGMENTS + 1) * 3)
    for (let i = 0; i <= SEGMENTS; i++) {
      pos[i * 3] = (i / SEGMENTS - 0.5) * 3
      pos[i * 3 + 1] = 0.5
      pos[i * 3 + 2] = 0
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color: '#5A3848' }))
  }, [])

  useFrame(() => {
    if (!lineObject) return
    const pos = lineObject.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i <= SEGMENTS; i++) {
      const p = points.current[i]
      pos.setXYZ(i, p.x, p.y, p.z)
    }
    pos.needsUpdate = true
  })

  return <primitive object={lineObject} />
}

function FigScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 2, 2]} intensity={1} />
      <YarnString mouse={mouse} />
    </>
  )
}

export default function HeroFig() {
  const mouse = useRef({ x: 0, y: 0 })
  const useSpline = !!SPLINE_SCENES.fig

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: 1 - (e.clientY - rect.top) / rect.height - 0.5,
    }
  }

  return (
    <section className="relative w-full h-full bg-fig-primary overflow-hidden">
      {useSpline ? (
        <div className="absolute inset-0" onPointerMove={onPointerMove}>
          <SplineScene scene={SPLINE_SCENES.fig} className="w-full h-full" />
        </div>
      ) : (
        <div className="absolute inset-0" onPointerMove={onPointerMove}>
          <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }} dpr={[1, 2]}>
            <FigScene mouse={mouse} />
          </Canvas>
        </div>
      )}
      <HeroContent theme="fig" />
    </section>
  )
}
