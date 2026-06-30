import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated bookmarks & collections',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated bookmarks & collections',
    primaryLinks: [
      { label: 'Collections', href: '/sbm' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get started', href: '/signup' },
      secondary: { label: 'Browse collections', href: '/sbm' },
    },
  },
  footer: {
    tagline: 'A calm home for bookmarks, collections, and resources worth keeping.',
    description:
      'Save the links you never want to lose, group them into clean collections, and rediscover them in seconds — all in one quiet, organized library.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Collections', href: '/sbm' },
          { label: 'Search', href: '/search' },
          { label: 'Home', href: '/' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: `${slot4BrandConfig.domain} · Built for clean discovery.`,
  },
  commonLabels: {
    readMore: 'Open resource',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Saved',
  },
} as const
