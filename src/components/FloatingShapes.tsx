/**
 * Squarespace-style abstract shapes: clearly visible blue & pink
 * circles and rounded squares with slow drift.
 */
export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Large blue circle – top left */}
      <div
        className="absolute w-[min(85vw,480px)] h-[min(85vw,480px)] rounded-full bg-primary-blue/28 shape-float-slow"
        style={{ top: '-12%', left: '-18%' }}
      />
      {/* Pink rounded square – right */}
      <div
        className="absolute w-[min(65vw,380px)] h-[min(65vw,380px)] rounded-[4rem] bg-primary-pink/25 shape-float-medium"
        style={{ top: '10%', right: '-12%' }}
      />
      {/* Blue circle – bottom left */}
      <div
        className="absolute w-[min(55vw,320px)] h-[min(55vw,320px)] rounded-full bg-primary-blue/22 shape-float-slow"
        style={{ bottom: '-8%', left: '0%' }}
      />
      {/* Pink rounded rect – center right */}
      <div
        className="absolute w-56 h-56 rounded-[2.5rem] bg-primary-pink/28 shape-float-medium"
        style={{ top: '48%', right: '5%' }}
      />
      {/* Pink large square – bottom right */}
      <div
        className="absolute w-[min(45vw,260px)] h-[min(45vw,260px)] rounded-[3rem] bg-primary-pink/22 shape-float-slow"
        style={{ bottom: '5%', right: '-5%' }}
      />
      {/* Blue medium circle – left center */}
      <div
        className="absolute w-72 h-72 rounded-full bg-primary-blue/20 shape-float-medium"
        style={{ top: '38%', left: '-10%' }}
      />
      {/* Small pink circle – top right */}
      <div
        className="absolute w-40 h-40 rounded-full bg-primary-pink/30 shape-float-slow"
        style={{ top: '25%', right: '20%' }}
      />
    </div>
  )
}
