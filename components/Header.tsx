'use client'

import Link from 'next/link'
import { useState } from 'react'

type NavChild = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavChild[]
}

export default function Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#D4C4A8]/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-xl font-semibold text-[#3D3529] hover:text-[#7C9885] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          Naturliglivsmestring
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {items.map((item) => {
            const isContact = item.href === '/kontakt'
            const hasChildren = Array.isArray(item.children) && item.children.length > 0

            if (hasChildren) {
              const trigger = item.href ? (
                <Link
                  href={item.href}
                  className="text-[#6B5E52] group-hover:text-[#5A7A65] transition-colors duration-200 font-medium text-sm flex items-center gap-1"
                >
                  {item.label}
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              ) : (
                <button
                  type="button"
                  className="text-[#6B5E52] group-hover:text-[#5A7A65] transition-colors duration-200 font-medium text-sm flex items-center gap-1 cursor-pointer"
                >
                  {item.label}
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )
              return (
                <div key={item.label} className="relative group">
                  {trigger}
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-[#F5F0E8] border border-[#D4C4A8]/60 rounded-2xl shadow-lg py-2 min-w-[200px]">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-[#3D3529] hover:bg-[#EBF0EC]/60 hover:text-[#5A7A65] transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href ?? '#'}
                className={
                  isContact
                    ? 'bg-[#5A7A65] text-[#F5F0E8] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#3D3529] transition-colors duration-200'
                    : 'text-[#6B5E52] hover:text-[#5A7A65] transition-colors duration-200 font-medium text-sm'
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#3D3529] cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Åbn menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-[#D4C4A8]/60 px-6 py-4 flex flex-col gap-2">
          {items.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0

            if (hasChildren) {
              const isExpanded = mobileExpanded === item.label
              return (
                <div key={item.label}>
                  <div className="w-full flex items-center justify-between text-[#3D3529] font-medium py-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex-1 hover:text-[#5A7A65]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="flex-1">{item.label}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      aria-label={isExpanded ? 'Skjul undermenu' : 'Vis undermenu'}
                      className="cursor-pointer p-2 -m-2"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-2 border-l border-[#D4C4A8]/60 pl-4">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setOpen(false); setMobileExpanded(null) }}
                          className="text-[#3D3529] hover:text-[#5A7A65] text-sm py-1"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href ?? '#'}
                onClick={() => setOpen(false)}
                className="text-[#3D3529] hover:text-[#5A7A65] font-medium py-2"
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
