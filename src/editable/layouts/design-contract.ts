import type { CSSProperties } from 'react'

/*
  Planar-inspired design system.

  A calm, premium "small business OS" aesthetic: warm off-white canvas, white
  cards with hairline warm-grey borders, near-black ink, soft generous radii,
  and quiet shadows. Primary actions are solid near-black pills. Colour comes
  from a small set of soft gradient tiles (see `editable-global.css`), never
  from loud fills — exactly like the reference.

  Every visible surface reads these CSS variables, so a single palette change
  here re-skins the whole site cohesively.
*/

export const editableRootStyle = {
  '--slot4-page-bg': '#f3f1ea',
  '--slot4-page-text': '#191711',
  '--slot4-panel-bg': '#ece9e0',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#6c675b',
  '--slot4-soft-muted-text': '#9a9488',
  '--slot4-accent': '#1b1813',
  '--slot4-accent-fill': '#1b1813',
  '--slot4-accent-soft': '#ece9e0',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#16140f',
  '--slot4-dark-text': '#f6f4ee',
  '--slot4-media-bg': '#e7e3d9',
  '--slot4-cream': '#f7f5ef',
  '--slot4-warm': '#efece4',
  '--slot4-lavender': '#f3f1ea',
  '--slot4-gray': '#efece4',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#f3f1ea',
  '--editable-page-text': '#191711',
  '--editable-container': '1200px',
  '--editable-border': '#e3dfd3',
  '--editable-line-strong': '#d8d3c5',
  '--editable-nav-bg': '#f3f1ea',
  '--editable-nav-text': '#191711',
  '--editable-nav-active': '#1b1813',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#1b1813',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#16140f',
  '--editable-footer-text': '#f6f4ee',
  '--editable-radius': '1.5rem',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-muted-text)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_2px_rgba(25,23,17,0.04)]',
  shadowStrong: 'shadow-[0_20px_60px_rgba(25,23,17,0.10)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]',
    heroTitle: 'text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]',
    sectionTitle: 'text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem]',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[var(--editable-radius)] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[var(--editable-radius)] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[var(--editable-radius)] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(25,23,17,0.28)] active:translate-y-0`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-line-strong)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] active:translate-y-0`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(25,23,17,0.28)]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[var(--editable-radius)] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(25,23,17,0.12)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site palette in editableRootStyle first; every section reads those CSS variables.',
  'Keep home structure in src/editable/sections/HomeSections.tsx so the whole home flow can be redesigned in one file.',
  'Use spacious, contained max-width layouts; never stretch content edge to edge.',
  'Primary actions are solid near-black pills; colour belongs to soft gradient tiles only.',
  'Keep dynamic post fetching intact; never replace live posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
