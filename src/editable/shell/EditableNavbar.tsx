'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, LogIn, LogOut, Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// Public navigation only: Home, the curated bookmarks/collections surface, and
// the supporting site pages. Profile and any raw task-archive links are kept
// out of the chrome by design — everything public centers on collections.
function usePublicNav() {
  return useMemo(() => {
    const taskLinks = SITE_CONFIG.tasks
      .filter((task) => task.enabled && task.key !== 'profile')
      .map((task) => ({ label: task.key === 'sbm' ? 'Collections' : task.label, href: task.route }))
    return [{ label: 'Home', href: '/' }, ...taskLinks, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
  }, [])
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = usePublicNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-3 rounded-full border px-3 py-2 pl-4 transition duration-500 sm:gap-4 ${
          scrolled
            ? 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/85 shadow-[0_16px_40px_rgba(25,23,17,0.10)] backdrop-blur-xl'
            : 'border-transparent bg-[var(--slot4-surface-bg)]/55 backdrop-blur-md'
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--slot4-accent)] transition duration-300 group-hover:scale-105">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          </span>
          <span className="editable-display max-w-[160px] truncate text-[17px] font-bold leading-none tracking-[-0.02em] text-[var(--slot4-page-text)]">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  active
                    ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-accent-soft)]/60 hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-page-text)] sm:inline-flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          {session ? (
            <>
              <span className="hidden max-w-[140px] truncate px-2 text-sm font-medium text-[var(--slot4-muted-text)] xl:inline">
                {session.name}
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(25,23,17,0.26)] sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-4 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(25,23,17,0.26)] sm:inline-flex"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 w-full max-w-[var(--editable-container)] overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_24px_60px_rgba(25,23,17,0.14)] lg:hidden">
          <form action="/search" className="mb-3 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder={`Search ${SITE_CONFIG.name}`}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-accent-soft)]/60'
                  }`}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              )
            })}
          </div>
          <div className="mt-3 grid gap-2 border-t border-[var(--editable-border)] pt-3">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
                  <PlusCircle className="h-4 w-4" /> Create a collection
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
