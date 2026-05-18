'use client'

import Link from 'next/link'
import { useState } from 'react'
import navigation from '@/content/navigation.json'

type NavItem = {
  label: string
  href: string
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const items = navigation.items as NavItem[]

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
            return (
              <Link
                key={item.href}
                href={item.href}
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
        <div className="md:hidden bg-[#F5F0E8] border-t border-[#D4C4A8]/60 px-6 py-4 flex flex-col gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[#3D3529] hover:text-[#5A7A65] font-medium py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
