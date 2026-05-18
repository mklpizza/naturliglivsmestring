'use client'

import { useState } from 'react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'INDSÆT_DIN_FORMSPREE_ID'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#EBF0EC] border border-[#7C9885]/30 rounded-[20px] p-10 text-center">
        <div className="w-14 h-14 bg-[#5A7A65] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#F5F0E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-[#3D3529] mb-2">
          Tak for din besked
        </h3>
        <p className="text-[#6B5E52]">
          Jeg vender tilbage til dig hurtigst muligt — typisk inden for 1–2 hverdage.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#3D3529] mb-1.5">
            Navn <span className="text-[#C67B5C]" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Dit navn"
            className="w-full px-4 py-3 bg-white border border-[#D4C4A8] rounded-xl text-[#3D3529] placeholder-[#D4C4A8] focus:outline-none focus:border-[#7C9885] focus:ring-2 focus:ring-[#7C9885]/20 transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#3D3529] mb-1.5">
            E-mail <span className="text-[#C67B5C]" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="din@email.dk"
            className="w-full px-4 py-3 bg-white border border-[#D4C4A8] rounded-xl text-[#3D3529] placeholder-[#D4C4A8] focus:outline-none focus:border-[#7C9885] focus:ring-2 focus:ring-[#7C9885]/20 transition-colors duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-[#3D3529] mb-1.5">
          Telefon <span className="text-[#D4C4A8] font-normal">(valgfri)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+45 00 00 00 00"
          className="w-full px-4 py-3 bg-white border border-[#D4C4A8] rounded-xl text-[#3D3529] placeholder-[#D4C4A8] focus:outline-none focus:border-[#7C9885] focus:ring-2 focus:ring-[#7C9885]/20 transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#3D3529] mb-1.5">
          Din besked <span className="text-[#C67B5C]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Fortæl mig kort, hvad du søger hjælp til. Du bestemmer selv, hvad du vil dele."
          className="w-full px-4 py-3 bg-white border border-[#D4C4A8] rounded-xl text-[#3D3529] placeholder-[#D4C4A8] focus:outline-none focus:border-[#7C9885] focus:ring-2 focus:ring-[#7C9885]/20 transition-colors duration-200 resize-y"
        />
      </div>

      {status === 'error' && (
        <p className="text-[#C67B5C] text-sm bg-[#F0DDD4] px-4 py-3 rounded-xl" role="alert">
          Noget gik galt. Prøv venligst igen, eller skriv direkte til mig via e-mail.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full md:w-auto bg-[#5A7A65] text-[#F5F0E8] px-10 py-3.5 rounded-full font-semibold text-base hover:bg-[#3D3529] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
      >
        {status === 'sending' ? 'Sender...' : 'Send besked'}
      </button>
    </form>
  )
}
