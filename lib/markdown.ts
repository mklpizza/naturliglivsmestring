import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const pagesDir = path.join(process.cwd(), 'content', 'pages')

export interface PageFrontmatter {
  title: string
  description: string
  image?: string
  imageAlt?: string
  excerpt?: string
}

export interface ParsedPage {
  frontmatter: PageFrontmatter
  contentHtml: string
  slug: string
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(pagesDir)) return []
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export async function getPageBySlug(slug: string): Promise<ParsedPage | null> {
  const filePath = path.join(pagesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = processed.toString()

  return {
    frontmatter: data as PageFrontmatter,
    contentHtml,
    slug,
  }
}
