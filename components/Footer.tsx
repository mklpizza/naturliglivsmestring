import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#3D3529] text-[#D4C4A8] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-[#F5F0E8] text-lg font-semibold mb-3">
              Naturliglivsmestring
            </h3>
            <p className="text-sm leading-relaxed text-[#D4C4A8]/80">
              Online mental coaching til dig, der søger ro og retning i en udfordrende tid.
            </p>
          </div>

          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-3">Emner</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Angst', href: '/angst' },
                { label: 'Stress', href: '/stress' },
                { label: 'Mistrivsel', href: '/mistrivsel' },
                { label: 'Manipulation', href: '/manipulation' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#7C9885] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-3">Kom i gang</h4>
            <p className="text-sm text-[#D4C4A8]/80 mb-4">
              Tag det første skridt. En samtale kan forandre meget.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-[#7C9885] text-[#F5F0E8] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5A7A65] transition-colors duration-200 cursor-pointer"
            >
              Kontakt mig
            </Link>
          </div>
        </div>

        <div className="border-t border-[#D4C4A8]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#D4C4A8]/50">
          <p>© {new Date().getFullYear()} Naturliglivsmestring. Alle rettigheder forbeholdes.</p>
          <div className="flex gap-4">
            <Link href="/om-mig" className="hover:text-[#D4C4A8] transition-colors">Om mig</Link>
            <Link href="/kontakt" className="hover:text-[#D4C4A8] transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
