'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/*
  Lightweight scroll-reveal wrapper.

  Renders a real element with [data-reveal] and, once mounted, flags the
  document so the hidden state in editable-global.css applies — meaning content
  is always visible when JavaScript is disabled. An IntersectionObserver then
  flips [data-reveal="in"] as the element scrolls into view. Honors
  prefers-reduced-motion by revealing immediately.
*/
export function EditableReveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  ...rest
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  [key: string]: unknown
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    document.documentElement.classList.add('editable-reveal-ready')

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.setAttribute('data-reveal', 'in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.setAttribute('data-reveal', 'in')
            observer.unobserve(node)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
