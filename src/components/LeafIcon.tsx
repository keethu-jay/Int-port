export default function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      {/* Monstera-style leaf: big, lobed, 2D silhouette */}
      <path
        d="M10 34c2.8 3.4 7.3 6 11.9 6.6 4.7.6 9.8-.7 13.6-3.8 3.8-3 6.1-7.7 7-12.6.8-4.4.5-9.1-1.4-12.3C39.3 7.7 35.9 6 32.4 6c-4.5 0-9.3 2-13 4.7C15.1 13.5 12 17 10.5 20.9 9 24.7 8.2 30.6 10 34Z"
        fill="currentColor"
      />
      {/* Simple stem / vein */}
      <path
        d="M19 18l10 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Cutouts along one side to feel like monstera holes */}
      <path
        d="M23 13c1 .2 2.5.9 3.4 1.7M19 15c.8.2 1.9.8 2.6 1.4M25 22c1 .3 2.3 1.1 3.1 1.9M22 24c.9.3 1.9 1 2.6 1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

