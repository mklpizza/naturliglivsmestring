import Link from 'next/link'

interface TopicCardProps {
  title: string
  description: string
  href: string
  icon: string
  iconLabel: string
}

export default function TopicCard({ title, description, href, icon, iconLabel }: TopicCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-[#F5F0E8] border border-[#D4C4A8]/60 rounded-[20px] p-7 hover:border-[#7C9885]/60 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="w-12 h-12 bg-[#EBF0EC] rounded-2xl flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-[#5A7A65]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-label={iconLabel}
          role="img"
        >
          {icon === 'heart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
          {icon === 'sun' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
          {icon === 'leaf' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3a2 2 0 00-2 2v2.586a1 1 0 00.293.707l9 9a1 1 0 001.414 0l6-6a1 1 0 000-1.414l-9-9A1 1 0 009.586 1H7a2 2 0 00-2 2z M9 9l-4 4" />}
          {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
        </svg>
      </div>
      <h3 className="font-heading text-xl font-semibold text-[#3D3529] mb-2 group-hover:text-[#5A7A65] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[#6B5E52] text-sm leading-relaxed">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 mt-4 text-sm text-[#5A7A65] font-medium group-hover:gap-2 transition-all duration-200">
        Læs mere
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
