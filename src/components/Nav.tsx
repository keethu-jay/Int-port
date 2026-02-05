import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
]

export default function Nav() {
  return (
    <nav className="fixed top-0 right-0 z-20 max-w-full p-2 sm:p-4">
      <div className="flex flex-wrap items-center justify-end gap-2 rounded-full bg-ink-dark/70 px-3 py-1.5 shadow-lg shadow-ink-dark/40 backdrop-blur-md">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="group nav-neon relative rounded-full px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base text-page-on-green font-medium transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">{label}</span>
            <span
              className="absolute inset-0 rounded-full bg-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </nav>
  )
}
