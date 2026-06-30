'use client'

import Link from 'next/link'
import { ArrowRight, Mail, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  // Public surfaces only — collections/resources first; profile and raw task
  // archives are intentionally absent.
  const collectionRoute = SITE_CONFIG.tasks.find((task) => task.enabled && task.key === 'sbm')?.route || '/sbm'
  const exploreLinks = [
    { label: 'Collections', href: collectionRoute },
    { label: 'Search', href: '/search' },
    { label: 'Home', href: '/' },
  ]
  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="mt-auto bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div className="grid gap-6 border-b border-white/10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
          <div>
            <h2 className="editable-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl">
              Keep the good stuff within reach.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
              {globalContent.footer?.description ||
                `Save, organize, and rediscover the best of the web with ${SITE_CONFIG.name}.`}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Stay in the loop</p>
            <form action="/contact" className="mt-3 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] p-1.5 pl-5">
              <Mail className="h-4 w-4 shrink-0 text-white/50" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-[var(--slot4-dark-bg)] transition hover:bg-white/90"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-xs text-white/40">We never share your details.</p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--slot4-accent)] transition duration-300 group-hover:scale-105">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
              </span>
              <span className="editable-display text-lg font-bold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
              {globalContent.footer?.tagline || 'A calm home for bookmarks, collections, and resources worth keeping.'}
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Company" links={companyLinks} />

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Account</h3>
            <div className="mt-4 grid gap-2.5">
              {session ? (
                <>
                  <FooterLink href="/create" label="Create a collection" />
                  <button
                    type="button"
                    onClick={logout}
                    className="text-left text-sm text-white/60 transition hover:text-white"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <FooterLink href="/login" label="Sign in" />
                  <FooterLink href="/signup" label="Get started" />
                </>
              )}
              <Link
                href="/search"
                className="mt-1 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
              >
                <Search className="h-4 w-4" /> Search the library
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{globalContent.footer?.bottomNote || `${SITE_CONFIG.domain} · Built for clean discovery.`}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{title}</h3>
      <div className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <FooterLink key={link.href} href={link.href} label={link.label} />
        ))}
      </div>
    </div>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm text-white/60 transition hover:translate-x-0.5 hover:text-white">
      {label}
    </Link>
  )
}
