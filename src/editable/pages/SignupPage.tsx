import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Get started', description: pagesContent.auth.signup.metadataDescription })
}

const perks = ['Free to start, no clutter', 'Collections that stay organized', 'Your library, always searchable']

export default function SignupPage() {
  const copy = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-6rem)] items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 max-w-[var(--editable-container)]">
          {/* Form */}
          <div className="order-2 mx-auto w-full max-w-md rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_24px_70px_rgba(25,23,17,0.08)] sm:p-9 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)] lg:hidden">{copy.badge}</p>
            <h1 className="editable-display mt-1 text-2xl font-semibold tracking-[-0.02em]">{copy.formTitle}</h1>
            <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{copy.description}</p>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-page-text)] underline-offset-4 hover:underline">{copy.loginCta}</Link></p>
          </div>

          {/* Brand panel */}
          <div className="relative order-1 hidden h-full overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] p-10 text-[var(--slot4-dark-text)] lg:order-2 lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-2xl planar-grad-3" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-30 blur-2xl planar-grad-4" />
            <div className="relative inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Bookmark className="h-5 w-5" /></span>
              <span className="editable-display text-lg font-bold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </div>
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{copy.badge}</p>
              <h2 className="editable-display mt-4 max-w-sm text-3xl font-semibold leading-[1.1] tracking-[-0.03em]">{copy.title}</h2>
              <ul className="mt-7 grid gap-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"><Check className="h-3 w-3" /></span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
