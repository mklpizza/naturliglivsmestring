import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const pagesDir = path.join(process.cwd(), 'content', 'pages')
const navigationFile = path.join(process.cwd(), 'content', 'navigation.json')

export interface PageFrontmatter {
  title: string
  description: string
  image?: string
  imageAlt?: string
  excerpt?: string
  menuParent?: string
}

export interface ParsedPage {
  frontmatter: PageFrontmatter
  contentHtml: string
  slug: string
}

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
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

/**
 * Læser navigation.json + alle sider med `menuParent` sat, og fletter dem
 * sammen til en menustruktur. Sider med menuParent indsættes automatisk som
 * underpunkter under det navngivne menupunkt.
 */
export function getMergedNavigation(): { items: NavItem[] } {
  let baseItems: NavItem[] = []
  if (fs.existsSync(navigationFile)) {
    try {
      const navData = JSON.parse(fs.readFileSync(navigationFile, 'utf-8'))
      if (Array.isArray(navData.items)) baseItems = navData.items
    } catch {
      baseItems = []
    }
  }

  // Find sider med menuParent
  const childrenByParent: Record<string, NavChild[]> = {}

  if (fs.existsSync(pagesDir)) {
    const slugs = getAllSlugs()
    for (const slug of slugs) {
      const filePath = path.join(pagesDir, `${slug}.md`)
      try {
        const raw = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(raw)
        const parent = (data as PageFrontmatter).menuParent
        if (parent) {
          if (!childrenByParent[parent]) childrenByParent[parent] = []
          childrenByParent[parent].push({
            label: (data as PageFrontmatter).title || slug,
            href: `/${slug}`,
          })
        }
      } catch {
        // skip ulæselige filer
      }
    }
  }

  // Flet auto-børn ind i de manuelle menupunkter (uden duplikater)
  const merged: NavItem[] = baseItems.map((item) => {
    const auto = childrenByParent[item.label]
    if (!auto || auto.length === 0) return item

    const existing = item.children || []
    const existingHrefs = new Set(existing.map((c) => c.href))
    const newOnes = auto.filter((c) => !existingHrefs.has(c.href))

    let allChildren = [...existing, ...newOnes]

    // Hvis forælderen selv har en side OG nu får underpunkter, indsæt forælderens
    // egen side først i dropdown'en, så den stadig kan tilgås.
    if (item.href && newOnes.length > 0 && !allChildren.some((c) => c.href === item.href)) {
      allChildren = [{ label: item.label, href: item.href }, ...allChildren]
    }

    return { ...item, children: allChildren }
  })

  return { items: merged }
}
