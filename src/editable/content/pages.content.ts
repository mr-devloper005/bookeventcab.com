import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated bookmarks, collections & resources',
      description:
        'Save the links worth keeping, organize them into clean collections, and rediscover them in seconds. A calm, premium home for your bookmarks and resources.',
      openGraphTitle: 'Curated bookmarks, collections & resources',
      openGraphDescription:
        'Save, organize, and rediscover the best of the web — clean collections and curated resources in one quiet library.',
      keywords: ['bookmarks', 'collections', 'curated resources', 'link library', 'social bookmarking'],
    },
    hero: {
      announcement: 'Browse curated collections of the web’s most useful links',
      announcementLink: { label: 'Explore collections', href: '/sbm' },
      badge: 'The bookmark OS',
      title: ['Meet ' + brand], // first line
      titleAccent: 'Your collections OS', // muted second line
      description:
        'Save the links you never want to lose, group them into clean collections, and find anything again in seconds — all in one quiet, organized library.',
      primaryCta: { label: 'Get started now', href: '/signup' },
      secondaryCta: { label: 'Browse collections', href: '/sbm' },
      searchPlaceholder: 'Search bookmarks, collections, and resources…',
    },
    intro: {
      badge: 'Why ' + brand,
      title: 'A calmer place for the links worth keeping.',
      paragraphs: [
        'Great resources slip away the moment we close a tab. ' + brand + ' keeps the links you care about organized into clean collections, searchable and one click away.',
        'Instead of scattered bookmarks and forgotten folders, everything lives in one quiet library designed for saving, browsing, and rediscovery.',
        'Whether you start from a collection, a search, or a single resource, related links stay close so discovery never feels like a chore.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Search the library', href: '/search' },
    },
    trust: {
      eyebrow: 'Curators and teams who keep it organized with ' + brand,
      stats: [
        { label: 'Resources saved', value: 'Curated' },
        { label: 'Collections', value: 'Organized' },
        { label: 'Always free to browse', value: 'Open' },
      ],
    },
    features: {
      eyebrow: 'Set once, then find forever',
      title: 'Everything you save, in its right place.',
      description:
        'A focused workspace for the links that matter — grouped, searchable, and always a click away.',
      items: [
        {
          key: 'collections',
          title: 'Collections',
          description: 'Group related links into clean, shareable collections that stay organized as they grow.',
        },
        {
          key: 'discovery',
          title: 'Smart discovery',
          description: 'Surface the right resource fast with search, categories, and curated browsing.',
        },
        {
          key: 'save',
          title: 'Save anything',
          description: 'Capture articles, tools, references, and inspiration the moment you find them.',
        },
        {
          key: 'resurface',
          title: 'Rediscover',
          description: 'Bring the best of your library back to the surface instead of letting it gather dust.',
        },
      ],
    },
    benefits: {
      eyebrow: 'How ' + brand + ' helps',
      title: 'Browsing with less friction',
      items: [
        { title: 'Clean collections', description: 'Organize links into tidy, purposeful groups you actually revisit.' },
        { title: 'Fast search', description: 'Find any saved resource by keyword, category, or title in seconds.' },
        { title: 'Curated quality', description: 'A library that favors signal over noise, surfaced front and center.' },
        { title: 'Simple saving', description: 'Add a resource with a title, link, and a short note — done.' },
        { title: 'Always discoverable', description: 'Connected browsing keeps related resources one click away.' },
        { title: 'Calm by design', description: 'A quiet, premium interface that keeps the focus on your links.' },
      ],
    },
    cta: {
      badge: 'Start your library',
      title: 'Got a link worth keeping?',
      description: 'Start a collection, save your first resource, and build a library you’ll actually come back to.',
      primaryCta: { label: 'Create a collection', href: '/create' },
      secondaryCta: { label: 'Browse collections', href: '/sbm' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions to the library.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer way to keep what matters.',
    description: `${brand} is built to make saving, organizing, and rediscovering links feel effortless — one quiet, premium library instead of a thousand scattered tabs.`,
    paragraphs: [
      'Great resources get lost the moment we close the tab. We wanted a place where the links worth keeping stay organized and easy to find again.',
      'Instead of disconnected bookmarks and forgotten folders, the platform keeps everything in clean collections, searchable and one click away whenever you need it.',
    ],
    values: [
      {
        title: 'Organized by design',
        description: 'We prioritize clarity and structure so collections stay tidy and useful as they grow.',
      },
      {
        title: 'Quality over noise',
        description: 'Curated resources and connected browsing surface the links that actually deserve your attention.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'Clean navigation and clear pages help you find and save useful resources faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'Tell us what you’re trying to organize.',
    description:
      'Suggest a resource, propose a collection, or ask about curation — we’ll route it through the right lane instead of forcing every request into the same bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, collections, and curated resources across the library.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find any saved resource, faster.',
      description: 'Use keywords, categories, and types to discover bookmarks and collections from across the library.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest in the library',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Save a new resource or start a collection.',
    },
    locked: {
      badge: 'Curator access',
      title: 'Sign in to start saving.',
      description: 'Use your account to open the workspace and add resources or build new collections for the library.',
    },
    hero: {
      badge: 'Curator workspace',
      title: 'Save a resource. Start a collection.',
      description: 'Pick a type, add the link and a short note, and drop it into a clean, organized collection.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Save to library',
    successTitle: 'Saved to your library.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your library.',
      badge: 'Member access',
      title: 'Welcome back to your library.',
      description: 'Sign in to keep saving, organizing, and rediscovering the resources that matter to you.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Start free',
      title: 'Create your account and start saving.',
      description: 'Set up an account to build collections, save resources, and keep your library organized.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related resources',
      fallbackTitle: 'Resource details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Saved by this curator',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
