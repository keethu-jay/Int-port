import { Suspense, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { Application } from '@splinetool/runtime'
import ErrorBoundary from './ErrorBoundary'

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (spline: Application) => void
}

function SplineSceneInner({ scene, className = '', onLoad }: SplineSceneProps) {
  const splineRef = useRef<Application | null>(null)

  const handleLoad = (spline: Application) => {
    splineRef.current = spline
    onLoad?.(spline)
  }

  if (!scene) {
    return (
      <div className={`flex items-center justify-center bg-black/20 ${className}`}>
        <p className="text-white/60 text-sm">No Spline scene configured</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center bg-black/20 ${className}`} style={{ width: '100%', height: '100%' }}>
          <div className="text-white/60 text-sm">Loading 3D scene...</div>
        </div>
      }
    >
      <Spline
        scene={scene}
        onLoad={handleLoad}
        className={className}
        style={{ width: '100%', height: '100%', minHeight: '100%', display: 'block' }}
      />
    </Suspense>
  )
}

export default function SplineScene(props: SplineSceneProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className={`flex items-center justify-center bg-black/20 ${props.className || 'w-full h-full'}`}>
          <p className="text-white/70 text-sm">3D scene failed to load.</p>
        </div>
      }
    >
      <SplineSceneInner {...props} />
    </ErrorBoundary>
  )
}
