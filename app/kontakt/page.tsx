import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Tag kontakt til Naturliglivsmestring og tag det første skridt mod mere ro og trivsel.',
}

export default function KontaktPage() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      <PageHeader
        eyebrow="Kom i gang"
        title="Lad os tage en samtale"
        excerpt="Det kræver mod at række ud. Jeg er glad for at du er her, og jeg vil gøre alt for at gøre det så trygt og nemt som muligt."
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-14">
          {/* Info */}
          <div className="space-y-5">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ),
                heading: 'E-mail',
                body: 'kontakt@naturliglivsmestring.dk',
                href: 'mailto:kontakt@naturliglivsmestring.dk',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
                heading: 'Fortrolighed',
                body: 'Alt hvad du deler, forbliver mellem os',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                heading: 'Ingen krav',
                body: 'En henvendelse forpligter dig ikke til noget',
              },
            ].map(({ icon, heading, body, href }) => (
              <div key={heading} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#EBF0EC] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#5A7A65]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#3D3529] text-sm">{heading}</p>
                  {href ? (
                    <a href={href} className="text-[#5A7A65] text-sm hover:underline">{body}</a>
                  ) : (
                    <p className="text-[#6B5E52] text-sm">{body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white/70 border border-[#D4C4A8]/60 rounded-[24px] p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
