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
 *
 * Menu-labels hentes automatisk fra sidernes nuværende title hvis href peger
 * på en kendt side, så menuen altid afspejler sidernes aktuelle titel.
 */
export function getMergedNavigation(): { items: NavItem[] } {
  let rawItems: NavItem[] = []
  if (fs.existsSync(navigationFile)) {
    try {
      const navData = JSON.parse(fs.readFileSync(navigationFile, 'utf-8'))
      if (Array.isArray(navData.items)) rawItems = navData.items
    } catch {
      rawItems = []
    }
  }

  // Byg map: slug -> aktuel sidetitel
  const titleBySlug: Record<string, string> = {}
  if (fs.existsSync(pagesDir)) {
    for (const slug of getAllSlugs()) {
      const filePath = path.join(pagesDir, `${slug}.md`)
      try {
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
        const title = (data as PageFrontmatter).title
        if (title) titleBySlug[slug] = title
      } catch {
        // skip
      }
    }
  }

  // Slå label op fra sidens nuværende title hvis href peger på en kendt side
  function resolveLabel(item: { label: string; href?: string }): string {
    if (item.href && item.href.startsWith('/')) {
      const slug = item.href.replace(/^\/+/, '')
      if (titleBySlug[slug]) return titleBySlug[slug]
    }
    return item.label
  }

  // Bevar originale labels så menuParent-referencer stadig matcher selv hvis
  // forælder-sidens titel er ændret efter at undersiderne blev sat op
  const originalLabels = rawItems.map((i) => i.label)

  const baseItems: NavItem[] = rawItems.map((item) => {
    const resolved: NavItem = { label: resolveLabel(item), href: item.href }
    if (Array.isArray(item.children)) {
      resolved.children = item.children.map((c) => ({
        label: resolveLabel(c),
        href: c.href,
      }))
    }
    return resolved
  })

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

  // Flet auto-børn ind — match både mod ORIGINAL label (fra navigation.json)
  // OG mod opdateret label (sidens nuværende title), så ændrede titler
  // ikke bryder eksisterende menuParent-referencer
  const merged: NavItem[] = baseItems.map((item, idx) => {
    const origLabel = originalLabels[idx]
    const auto = childrenByParent[origLabel] || childrenByParent[item.label] || []
    if (auto.length === 0) return item

    const existing = item.children || []
    const existingHrefs = new Set(existing.map((c) => c.href))
    const newOnes = auto.filter((c) => !existingHrefs.has(c.href))

    return { ...item, children: [...existing, ...newOnes] }
  })

  return { items: merged }
}
