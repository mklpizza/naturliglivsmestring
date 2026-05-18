import Image from 'next/image'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  excerpt?: string
  image?: string
  imageAlt?: string
}

export default function PageHeader({ eyebrow, title, excerpt, image, imageAlt }: PageHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: image ? '360px' : undefined }}>
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay: sage-green at top fading to cream at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(187, 213, 197, 0.88) 0%, rgba(235, 240, 236, 0.82) 55%, rgba(245, 240, 232, 1) 100%)',
            }}
          />
        </>
      )}

      {!image && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#DDE8E0] to-[#F5F0E8]" />
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16">
        {eyebrow && (
          <p className="text-[#4A6B55] text-sm font-semibold uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl font-semibold text-[#3D3529] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {title}
        </h1>
        {excerpt && (
          <p className="text-[#4A3F35] text-xl leading-relaxed max-w-2xl">
            {excerpt}
          </p>
        )}
      </div>
    </div>
  )
}
