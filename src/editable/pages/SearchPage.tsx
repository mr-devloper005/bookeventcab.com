import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Filter, Search, SearchX } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { Ads } from '@/lib/ads'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

// Varied placement per search query; shape/fit stay locked in src/lib/ads.
const AD_SLOT_POOL = ['header', 'in-feed', 'footer', 'article-bottom', 'sidebar'] as const
function hashSeed(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}
function pickAdSlot(seed: string) {
  return AD_SLOT_POOL[hashSeed(seed) % AD_SLOT_POOL.length]
}
// Seeded position so the ad sits inside the results (never pinned to the top).
function seededAdIndex(seed: string, length: number) {
  if (length <= 3) return length
  const min = 2
  const max = length - 1
  return min + (hashSeed(`${seed}-pos`) % (max - min + 1))
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
const domainOf = (post: SitePost) => {
  const content = getContent(post)
  const raw = compactRaw(content.website) || compactRaw(content.url) || compactRaw(content.link)
  return raw ? raw.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '') : ''
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

const gradients = ['planar-grad-1', 'planar-grad-2', 'planar-grad-3', 'planar-grad-4']

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'sbm'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const domain = domainOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Resource'

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(25,23,17,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className={`flex h-full items-center justify-center ${gradients[index % gradients.length]}`}>
            <span className="editable-display text-5xl font-bold text-[var(--slot4-page-text)]/35">{(post.title || '?').charAt(0).toUpperCase()}</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-surface-bg)]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--slot4-page-text)] backdrop-blur-sm">{taskLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {domain ? <p className="text-xs font-medium text-[var(--slot4-muted-text)]">{domain}</p> : null}
        <h2 className="editable-display mt-1.5 line-clamp-2 text-lg font-semibold leading-snug text-[var(--slot4-page-text)]">{post.title}</h2>
        {summary ? <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{stripHtml(summary)}</p> : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-page-text)]">Open <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && item.key !== 'profile')

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-5 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          {/* Search hero */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{pagesContent.search.hero.badge}</p>
            <h1 className="editable-display mt-4 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{pagesContent.search.hero.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
          </div>

          <form action="/search" className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_20px_60px_rgba(25,23,17,0.08)] sm:p-5">
            <input type="hidden" name="master" value="1" />
            <label className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-5 py-3.5">
              <Search className="h-5 w-5 text-[var(--slot4-muted-text)]" />
              <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3">
                <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              </label>
              <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-medium outline-none">
                <option value="">All types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5" type="submit">
                Search
              </button>
            </div>
          </form>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-2xl font-semibold tracking-[-0.02em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-line-strong)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)]">Browse collections <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-5 pb-20 pt-6 sm:px-6 lg:px-8">
          {results.length ? (
            (() => {
              const adSlot = pickAdSlot(`search-${normalized || task || 'all'}`)
              const adAt = seededAdIndex(`search-${normalized || task || 'all'}`, results.length)
              const before = results.slice(0, adAt)
              const after = results.slice(adAt)
              return (
                <>
                  {before.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {before.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
                    </div>
                  ) : null}
                  <div className="my-12 flex justify-center">
                    <Ads slot={adSlot} showLabel className="w-full" />
                  </div>
                  {after.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {after.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={adAt + index} />)}
                    </div>
                  ) : null}
                </>
              )
            })()
          ) : (
            <>
              <div className="mx-auto max-w-xl rounded-[var(--editable-radius)] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-8 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)]"><SearchX className="h-6 w-6 text-[var(--slot4-page-text)]" /></div>
                <p className="editable-display mt-5 text-2xl font-semibold tracking-[-0.02em]">No matching resources found</p>
                <p className="mt-3 text-sm leading-6 text-[var(--slot4-muted-text)]">Try a different keyword, type, or category.</p>
              </div>
              <div className="mt-12 flex justify-center">
                <Ads slot={pickAdSlot(`search-${normalized || task || 'all'}`)} showLabel className="w-full" />
              </div>
            </>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
