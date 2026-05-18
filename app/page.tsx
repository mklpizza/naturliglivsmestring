import Image from 'next/image'
import Link from 'next/link'
import TopicCard from '@/components/TopicCard'
import CtaBanner from '@/components/CtaBanner'

const topics = [
  {
    title: 'Angst',
    description:
      'Angst kan føles overvældende og svær at forklare. Her finder du hjælp til at forstå din angst og finde veje til mere ro.',
    href: '/angst',
    icon: 'heart',
    iconLabel: 'Hjerteikon',
  },
  {
    title: 'Stress',
    description:
      'Når kroppen og sindet er i konstant alarmberedskab, er det tid til at tage sig selv alvorligt. Vi finder vejen ud af stressspiralen.',
    href: '/stress',
    icon: 'sun',
    iconLabel: 'Solikon',
  },
  {
    title: 'Mistrivsel',
    description:
      'Noget føles ikke rigtigt, selvom det er svært at sætte ord på. Mistrivsel er et signal, det er værd at lytte til.',
    href: '/mistrivsel',
    icon: 'leaf',
    iconLabel: 'Bladikon',
  },
  {
    title: 'Manipulation',
    description:
      'At genkende manipulative mønstre i relationer er første skridt mod at beskytte dig selv og sætte grænser.',
    href: '/manipulation',
    icon: 'shield',
    iconLabel: 'Skjoldikon',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Full-height hero med gradient og al tekst ovenpå billedet */}
      <div className="relative w-full overflow-hidden flex flex-col" style={{ minHeight: 'calc(100dvh - 4.5rem)' }}>
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80"
          alt="Rolig strand med klart turkisblåt vand"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(187,213,197,0.88) 0%, rgba(235,240,236,0.82) 55%, rgba(245,240,232,1) 100%)',
          }}
        />

        {/* Indhold centreret vertikalt */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-[#4A6B55] text-sm font-semibold uppercase tracking-widest mb-4">
            Online mental coaching
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3D3529] leading-tight mb-6 max-w-3xl">
            Find roen igen — i dit eget tempo
          </h1>
          <p className="text-[#4A3F35] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Du behøver ikke at have det hele på plads, før du søger hjælp. Jeg tilbyder et trygt og fortroligt rum,
            hvor vi sammen finder veje gennem angst, stress og livets udfordringer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-block bg-[#5A7A65] text-[#F5F0E8] px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#3D3529] transition-colors duration-200 text-center cursor-pointer"
            >
              Book en samtale
            </Link>
            <Link
              href="/om-mig"
              className="inline-block border border-[#7C9885] text-[#5A7A65] px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#EBF0EC] transition-colors duration-200 text-center cursor-pointer"
            >
              Læs om mig
            </Link>
          </div>
        </div>

        {/* Scroll-indikator — i flow så den ikke klippes */}
        <div className="relative z-10 flex justify-center pb-10" aria-hidden="true">
          <div className="scroll-mouse" />
        </div>
      </div>

      {/* Intro */}
      <section className="bg-[#F5F0E8] pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#3D3529] mb-5">
            Du er ikke alene med det, du bærer på
          </h2>
          <p className="text-[#6B5E52] text-lg leading-relaxed">
            Mange mennesker lever med angst, stress eller en oplevelse af at have mistet sig selv i hverdagen.
            Som online mental coach hjælper jeg dig med at forstå, hvad der foregår i dig — og hvad du kan gøre ved det.
            Vi arbejder online, i dit eget tempo, og du bestemmer selv, hvornår du er klar.
          </p>
        </div>
      </section>

      {/* Topic cards */}
      <section className="bg-[#F7F3EC] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#3D3529] mb-3">
              Hvad arbejder vi med?
            </h2>
            <p className="text-[#6B5E52]">Klik på et emne og læs mere om, hvordan jeg kan hjælpe.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map((topic) => (
              <TopicCard key={topic.href} {...topic} />
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="bg-[#F5F0E8] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 md:h-80 rounded-[20px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=80"
              alt="Person der går på strand i varmt sollys"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#3D3529] mb-5">
              Hvorfor mental coaching?
            </h2>
            <ul className="space-y-4">
              {[
                { heading: 'Et trygt rum', text: 'Ingen domme, ingen hurtige løsninger. Blot et sted, hvor du kan være ærlig.' },
                { heading: 'Online og fleksibelt', text: 'Vi mødes, når det passer dig — fra din egen sofa.' },
                { heading: 'Individuel tilgang', text: 'Din situation er unik. Vi finder den tilgang, der virker for dig.' },
                { heading: 'Langsigtet støtte', text: 'Forandring tager tid. Jeg er her med dig hele vejen.' },
              ].map(({ heading, text }) => (
                <li key={heading} className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-[#7C9885] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold text-[#3D3529]">{heading}</span>
                    <span className="text-[#6B5E52]"> — {text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F3EC] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <CtaBanner />
        </div>
      </section>
    </>
  )
}
