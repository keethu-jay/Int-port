import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import FloatingShapes from './FloatingShapes'
import LeafIcon from './LeafIcon'

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-page-bg text-page-on-green overflow-hidden">
      {/* Gradient mesh + abstract shapes – sit behind everything */}
      <div className="fixed inset-0 bg-mesh bg-grid-subtle pointer-events-none" aria-hidden />
      <FloatingShapes />

      {/* Leaf accents near page edges – larger, monstera-like shapes, all pink and behind content */}
      <LeafIcon className="pointer-events-none fixed top-6 left-4 h-20 w-20 text-primary-pink/70 -z-10" />
      <LeafIcon className="pointer-events-none fixed bottom-10 right-6 h-24 w-24 text-primary-pink/70 -z-10" />
      <LeafIcon className="pointer-events-none fixed top-1/2 -left-4 h-18 w-18 text-primary-pink/60 -z-10" />
      <LeafIcon className="pointer-events-none fixed bottom-1/3 -right-4 h-18 w-18 text-primary-pink/60 -z-10" />

      <Nav />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
