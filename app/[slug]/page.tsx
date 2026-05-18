import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllSlugs, getPageBySlug } from '@/lib/markdown'
import CtaBanner from '@/components/CtaBanner'
import PageHeader from '@/components/PageHeader'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
  }
}

export default async function SlugPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  const { frontmatter, contentHtml } = page

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      <PageHeader
        eyebrow="Naturliglivsmestring"
        title={frontmatter.title}
        excerpt={frontmatter.excerpt}
        image={frontmatter.image}
        imageAlt={frontmatter.imageAlt}
      />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-14">
        <div
          className="prose-naturlig"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <CtaBanner />
      </section>
    </div>
  )
}
