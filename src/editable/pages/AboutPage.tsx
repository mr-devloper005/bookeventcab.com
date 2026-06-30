import Link from 'next/link'
import { ArrowRight, Bookmark, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const valueIcons = [Compass, Sparkles, ShieldCheck]

export default function AboutPage() {
  const about = pagesContent.about

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(55%_70%_at_50%_0%,rgba(25,23,17,0.06),transparent_70%)]" />
          <div className="relative mx-auto max-w-[var(--editable-container)] px-5 pt-16 text-center sm:px-6 lg:px-8 lg:pt-24">
            <EditableReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
                <Bookmark className="h-3.5 w-3.5" /> {about.badge}
              </span>
              <h1 className="editable-display mx-auto mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">
                {about.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">{about.description}</p>
            </EditableReveal>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <EditableReveal className="space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5">
                Browse collections <ArrowRight className="h-4 w-4" />
              </Link>
            </EditableReveal>
            <EditableReveal className="grid gap-4 sm:grid-cols-2" delay={80}>
              {['planar-grad-1', 'planar-grad-2', 'planar-grad-4', 'planar-grad-3'].map((grad, i) => (
                <div key={grad} className={`h-40 rounded-[var(--editable-radius)] border border-[var(--editable-border)] ${grad} ${i % 2 ? 'sm:mt-8' : ''}`} />
              ))}
            </EditableReveal>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--slot4-cream)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <EditableReveal className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">What we value</p>
              <h2 className="editable-display mt-3 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
                Built around how people actually save.
              </h2>
            </EditableReveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {about.values.map((value, i) => {
                const Icon = valueIcons[i % valueIcons.length]
                return (
                  <EditableReveal key={value.title} delay={i * 80}>
                    <div className="h-full rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(25,23,17,0.10)]">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="editable-display mt-5 text-xl font-semibold">{value.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                    </div>
                  </EditableReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8">
          <EditableReveal className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-14 text-center sm:px-12">
            <h2 className="editable-display max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl">
              Start building a library worth keeping.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-line-strong)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--slot4-accent)]">
                Contact {SITE_CONFIG.name}
              </Link>
            </div>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
