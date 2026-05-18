import Link from 'next/link'

interface CtaBannerProps {
  title?: string
  body?: string
  buttonLabel?: string
}

export default function CtaBanner({
  title = 'Tag det første skridt',
  body = 'Du behøver ikke at stå alene med dine udfordringer. Jeg er her for at lytte og hjælpe dig videre — i dit eget tempo.',
  buttonLabel = 'Kontakt mig i dag',
}: CtaBannerProps) {
  return (
    <section className="bg-[#EBF0EC] border border-[#7C9885]/20 rounded-[24px] px-8 py-12 md:py-16 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#3D3529] mb-4">
          {title}
        </h2>
        <p className="text-[#6B5E52] text-lg leading-relaxed mb-8">
          {body}
        </p>
        <Link
          href="/kontakt"
          className="inline-block bg-[#5A7A65] text-[#F5F0E8] px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#3D3529] transition-colors duration-200 shadow-sm cursor-pointer"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
