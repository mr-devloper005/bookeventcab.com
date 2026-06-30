import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, Check, Compass, FolderOpen, Layers,
  Search, Sparkles, Star, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'
import { EditableReveal } from '@/editable/shell/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'
const gradients = ['planar-grad-1', 'planar-grad-2', 'planar-grad-3', 'planar-grad-4']

/* ----------------------------- data helpers ----------------------------- */
function getContentObj(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = getContentObj(post)
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = getContentObj(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function domainOf(post?: SitePost | null) {
  const content = getContentObj(post)
  const raw =
    (typeof content.website === 'string' && content.website) ||
    (typeof content.url === 'string' && content.url) ||
    (typeof content.link === 'string' && content.link) ||
    ''
  if (!raw) return ''
  return raw.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
}

function hasRealImage(post?: SitePost | null) {
  const img = getEditablePostImage(post)
  return Boolean(img) && !img.includes('placeholder')
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

/* ---------------------------- shared bits ------------------------------- */
function MediaThumb({ post, index, className = '' }: { post: SitePost; index: number; className?: string }) {
  if (hasRealImage(post)) {
    return (
      <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${className}`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
      </div>
    )
  }
  const initial = (post.title || '?').trim().charAt(0).toUpperCase()
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${gradients[index % gradients.length]} ${className}`}>
      <span className="editable-display text-5xl font-bold text-[var(--slot4-page-text)]/35">{initial}</span>
      <Bookmark className="absolute right-4 top-4 h-5 w-5 text-[var(--slot4-page-text)]/40" />
    </div>
  )
}

function BookmarkCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const domain = domainOf(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(25,23,17,0.12)]"
    >
      <MediaThumb post={post} index={index} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">
          {category ? <span>{category}</span> : <span>Saved</span>}
          {domain ? <><span className="opacity-40">·</span><span className="truncate text-[var(--slot4-muted-text)]">{domain}</span></> : null}
        </div>
        <h3 className="editable-display mt-2.5 line-clamp-2 text-lg font-semibold leading-snug text-[var(--slot4-page-text)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 120)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-page-text)]">
          Open resource
          <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* ------------------------------- HERO ----------------------------------- */
export function EditableHomeHero({ posts, timeSections, primaryTask, primaryRoute }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const hero = pagesContent.home.hero
  const titleMain = hero.title?.join(' ') || `Meet ${SITE_CONFIG.name}`
  const showcase = pool[0]

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(25,23,17,0.06),transparent_70%)]" />
      <div className={`relative ${container} pt-16 sm:pt-20 lg:pt-24`}>
        {/* Announcement */}
        <EditableReveal className="mx-auto flex max-w-fit items-center justify-center">
          <Link
            href={hero.announcementLink.href}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] py-1.5 pl-2 pr-4 text-sm text-[var(--slot4-muted-text)] shadow-[0_1px_2px_rgba(25,23,17,0.04)] transition hover:border-[var(--slot4-accent)]"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--slot4-accent)] px-2.5 py-1 text-[11px] font-semibold text-[var(--slot4-on-accent)]">
              <Sparkles className="h-3 w-3" /> New
            </span>
            <span className="hidden sm:inline">{hero.announcement}</span>
            <span className="sm:hidden">{hero.announcementLink.label}</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </EditableReveal>

        {/* Headline */}
        <EditableReveal className="mx-auto mt-8 max-w-3xl text-center" delay={60}>
          <h1 className="editable-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[4.5rem]">
            {titleMain}
            <span className="mt-1 block text-[var(--slot4-soft-muted-text)]">{hero.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">
            {hero.description}
          </p>
        </EditableReveal>

        {/* CTAs + search */}
        <EditableReveal className="mx-auto mt-9 flex max-w-xl flex-col items-center gap-4" delay={120}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(25,23,17,0.28)]"
            >
              {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-line-strong)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
          <form action="/search" className="flex w-full items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 pl-5 shadow-[0_8px_30px_rgba(25,23,17,0.06)]">
            <Search className="h-[18px] w-[18px] shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              placeholder={hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:opacity-90">
              Search
            </button>
          </form>
        </EditableReveal>

        {/* Showcase collage */}
        <EditableReveal className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-3" delay={160}>
          <div className="relative h-[260px] overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)] sm:h-[320px]">
            <EditableHeroCollage images={heroImages} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.45))]" />
            <p className="absolute bottom-4 left-4 text-xs font-medium text-white/85">Latest in the library</p>
          </div>

          <div className="flex h-[260px] flex-col justify-between rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 sm:h-[320px]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)]">
                <Bookmark className="h-5 w-5 text-[var(--slot4-page-text)]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--slot4-page-text)]">New resource</p>
                <p className="truncate text-xs text-[var(--slot4-muted-text)]">{showcase ? (domainOf(showcase) || categoryOf(showcase) || 'Saved link') : 'Saved link'}</p>
              </div>
            </div>
            <div>
              <p className="editable-display line-clamp-3 text-xl font-semibold leading-snug text-[var(--slot4-page-text)]">
                {showcase?.title || 'Save your first resource'}
              </p>
            </div>
            <Link href={showcase ? postHref(primaryTask, showcase, primaryRoute) : primaryRoute} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--slot4-page-text)]">
              Open <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className={`relative flex h-[260px] flex-col justify-between overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] p-6 sm:h-[320px] ${gradients[0]}`}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-page-text)]/60">Organized</span>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">In every collection</p>
              <div className="mt-3 space-y-2">
                {['Read later', 'Tools', 'References'].map((row, i) => (
                  <div key={row} className="flex items-center gap-2 text-sm font-medium text-[var(--slot4-page-text)]">
                    <span className={`flex h-4 w-4 items-center justify-center rounded ${i === 1 ? 'bg-[var(--slot4-accent)]' : 'border border-[var(--slot4-page-text)]/30'}`}>
                      {i === 1 ? <Check className="h-3 w-3 text-white" /> : null}
                    </span>
                    {row}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>

      {/* Trust strip */}
      <EditableReveal className={`${container} mt-16 sm:mt-20`}>
        <div className="flex flex-col items-center gap-6 border-y border-[var(--editable-border)] py-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">{pagesContent.home.trust.eyebrow}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {pagesContent.home.trust.stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
                <Check className="h-4 w-4 text-[var(--slot4-page-text)]" />
                <span className="font-semibold text-[var(--slot4-page-text)]">{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </EditableReveal>
    </section>
  )
}

/* ----------------- FEATURES: side list + showcase card ------------------ */
const featureIcons = [FolderOpen, Compass, Bookmark, Sparkles]

export function EditableStoryRail({ posts, timeSections, primaryTask, primaryRoute }: HomeSectionProps) {
  const features = pagesContent.home.features
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const showcase = pool.slice(0, 3)

  return (
    <section className={`${container} py-20 sm:py-24 lg:py-28`}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <EditableReveal className="lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{features.eyebrow}</p>
          <h2 className="editable-display mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-[2.75rem]">
            {features.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-[var(--slot4-muted-text)]">{features.description}</p>
          <div className="mt-8 grid gap-2.5">
            {features.items.map((item, i) => {
              const Icon = featureIcons[i % featureIcons.length]
              return (
                <div
                  key={item.key}
                  className={`group flex items-start gap-4 rounded-2xl border p-4 transition duration-300 ${
                    i === 0
                      ? 'border-[var(--editable-line-strong)] bg-[var(--slot4-surface-bg)] shadow-[0_8px_30px_rgba(25,23,17,0.06)]'
                      : 'border-transparent hover:border-[var(--editable-border)] hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--slot4-page-text)]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </EditableReveal>

        <EditableReveal className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 sm:p-6 lg:p-8" delay={80}>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
              <Layers className="h-4 w-4" /> Read later
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {showcase.length ? (
              showcase.map((post, i) => (
                <Link
                  key={post.id || post.slug}
                  href={postHref(primaryTask, post, primaryRoute)}
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(25,23,17,0.10)]"
                >
                  <MediaThumb post={post} index={i} className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">
                      {categoryOf(post) || domainOf(post) || 'Saved'}
                    </p>
                    <h3 className="editable-display mt-1 line-clamp-2 text-base font-semibold leading-snug text-[var(--slot4-page-text)]">{post.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)] transition group-hover:text-[var(--slot4-page-text)]" />
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 text-center text-sm text-[var(--slot4-muted-text)]">
                Saved resources will appear here as the library grows.
              </div>
            )}
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

/* ------------------ LATEST GRID + BENEFITS icon grid -------------------- */
export function EditableMagazineSplit({ posts, timeSections, primaryTask, primaryRoute }: HomeSectionProps) {
  const latest = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 6)
  const benefits = pagesContent.home.benefits
  const benefitIcons = [Layers, Search, Star, Bookmark, Compass, Sparkles]

  return (
    <>
      {latest.length ? (
        <section className="bg-[var(--slot4-cream)]">
          <div className={`${container} py-20 sm:py-24`}>
            <EditableReveal className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Fresh saves</p>
                <h2 className="editable-display mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-[2.5rem]">
                  Latest in the library
                </h2>
              </div>
              <Link href={primaryRoute} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-page-text)] hover:gap-2.5">
                Browse all collections <ArrowRight className="h-4 w-4" />
              </Link>
            </EditableReveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post, i) => (
                <EditableReveal key={post.id || post.slug} delay={(i % 3) * 70}>
                  <BookmarkCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`${container} py-20 sm:py-24`}>
        <EditableReveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{benefits.eyebrow}</p>
          <h2 className="editable-display mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-[2.75rem]">
            {benefits.title}
          </h2>
        </EditableReveal>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, i) => {
            const Icon = benefitIcons[i % benefitIcons.length]
            return (
              <EditableReveal key={item.title} delay={(i % 3) * 70}>
                <div className="group">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)] transition duration-300 group-hover:bg-[var(--slot4-accent)] group-hover:text-[var(--slot4-on-accent)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="editable-display mt-5 text-lg font-semibold text-[var(--slot4-page-text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.description}</p>
                </div>
              </EditableReveal>
            )
          })}
        </div>
      </section>
    </>
  )
}

/* ------------------ TIME-WINDOW collections (gradient) ------------------ */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Most-saved this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ posts, timeSections, primaryTask, primaryRoute }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <section className="bg-[var(--slot4-cream)]">
      <div className={`${container} py-20 sm:py-24`}>
        {visible.map((section, index) => {
          const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
          return (
            <div key={section.key} className={index > 0 ? 'mt-16' : ''}>
              <EditableReveal className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-page-text)] hover:gap-2.5">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </EditableReveal>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, i) => (
                  <EditableReveal key={post.id || post.slug} delay={(i % 4) * 60}>
                    <BookmarkCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
                  </EditableReveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* -------------------------------- CTA ----------------------------------- */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className={`${container} scroll-mt-24 py-16 sm:py-20`}>
      <EditableReveal className="relative overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-2xl ${gradients[0]}`} />
        <div className={`pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-30 blur-2xl ${gradients[1]}`} />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <Zap className="h-3.5 w-3.5" /> {cta.badge}
          </span>
          <h2 className="editable-display mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--slot4-dark-text)] sm:text-5xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg">{cta.description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href={cta.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--slot4-dark-bg)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.3)]"
            >
              {cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              {cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </EditableReveal>
    </section>
  )
}
