import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HeroContent from '../HeroContent'
import SplineScene from '../SplineScene'
import { SPLINE_SCENES } from '../../config/splineScenes'
import { useMouse } from '../../context/MouseContext'

const PARALLAX_STRENGTH = 22

const GRASS_COUNT = 800
const PARTICLE_COUNT = 120

function GrassField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const matrix = useRef(new THREE.Matrix4())
  const dummy = useRef(new THREE.Object3D())
  const initialized = useRef(false)

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.04, 0.5, 1, 4)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    if (!initialized.current) {
      for (let i = 0; i < GRASS_COUNT; i++) {
        dummy.current.position.set(
          (Math.random() - 0.5) * 8,
          0,
          (Math.random() - 0.5) * 8
        )
        dummy.current.rotation.y = Math.random() * Math.PI * 2
        dummy.current.scale.setScalar(0.4 + Math.random() * 0.6)
        dummy.current.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.current.matrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
      initialized.current = true
    }
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < GRASS_COUNT; i++) {
      meshRef.current.getMatrixAt(i, matrix.current)
      matrix.current.decompose(
        new THREE.Vector3(),
        new THREE.Quaternion(),
        new THREE.Vector3()
      )
      const sway = Math.sin(time * 2 + i * 0.1) * 0.08
      matrix.current.makeRotationY(sway)
      meshRef.current.setMatrixAt(i, matrix.current)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geom, undefined, GRASS_COUNT]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#4A5D23" side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

function FlyingParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0,
    }))
  )
  const lastEmit = useRef(0)
  const emitIdx = useRef(0)

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3))
    return g
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = mouse.current.x * 4
    const my = mouse.current.y * 4

    if (t - lastEmit.current > 0.05) {
      lastEmit.current = t
      const p = particles.current[emitIdx.current % PARTICLE_COUNT]
      p.x = mx
      p.y = my
      p.z = 0
      p.vx = (Math.random() - 0.5) * 0.15
      p.vy = 0.08 + Math.random() * 0.1
      p.vz = (Math.random() - 0.5) * 0.05
      p.life = 1
      emitIdx.current++
    }

    const positionAttr = pointsRef.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined
    if (!positionAttr) return
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles.current[i]
      if (p.life <= 0) continue
      p.x += p.vx
      p.y += p.vy
      p.z += p.vz
      p.vy -= 0.002
      p.life -= 0.015
      positionAttr.setXYZ(i, p.x, p.y, p.z)
    }
    positionAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial
        size={0.06}
        color="#7B8FA1"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

function MeadowScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 4, 2]} intensity={1} />
      <GrassField />
      <FlyingParticles mouse={mouse} />
    </>
  )
}

export default function HeroMeadow() {
  const mouse = useRef({ x: 0, y: 0 })
  const { mouse: globalMouse } = useMouse()
  const useSpline = !!SPLINE_SCENES.meadow

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: 1 - (e.clientY - rect.top) / rect.height - 0.5,
    }
  }

  return (
    <section className="relative w-full h-full bg-meadow-chartreuse overflow-hidden">
      {useSpline ? (
        <>
          {/* Your photo as parallax background (same “photo Spline” setup as old Pond) */}
          <motion.div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/assets/hero-landscape.png)',
              scale: 1.15,
            }}
            animate={{
              x: globalMouse.normX * PARALLAX_STRENGTH,
              y: globalMouse.normY * PARALLAX_STRENGTH,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          />
          <div className="absolute inset-0 z-[1] bg-meadow-olive/30" aria-hidden />
          <div className="absolute inset-0 z-[2]" onPointerMove={onPointerMove}>
            <SplineScene scene={SPLINE_SCENES.meadow} className="w-full h-full" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0" onPointerMove={onPointerMove}>
          <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }} dpr={[1, 2]}>
            <MeadowScene mouse={mouse} />
          </Canvas>
        </div>
      )}
      <HeroContent theme="meadow" />
    </section>
  )
}
