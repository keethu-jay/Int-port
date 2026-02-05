import '@splinetool/viewer'

interface SplineViewerSceneProps {
  url: string
  className?: string
}

export default function SplineViewerScene({ url, className = '' }: SplineViewerSceneProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100%',
      }}
    >
      <spline-viewer
        url={url}
        loading="eager"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '100%',
        }}
      />
    </div>
  )
}
