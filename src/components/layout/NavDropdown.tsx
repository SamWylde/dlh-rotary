'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

type NavDropdownProps = {
  trigger: React.ReactNode
  items: Array<{
    key: string
    href: string
    label: string
    newTab?: boolean
  }>
}

export const NavDropdown = ({ trigger, items }: NavDropdownProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, close])

  const focusItem = (index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1))
    itemRefs.current[clamped]?.focus()
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault()
        setOpen(true)
        requestAnimationFrame(() => focusItem(0))
        break
      case 'Escape':
        close()
        break
    }
  }

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        focusItem(index + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index === 0) {
          close()
          containerRef.current?.querySelector<HTMLElement>('[aria-haspopup]')?.focus()
        } else {
          focusItem(index - 1)
        }
        break
      case 'Escape':
        e.preventDefault()
        close()
        containerRef.current?.querySelector<HTMLElement>('[aria-haspopup]')?.focus()
        break
      case 'Tab':
        close()
        break
    }
  }

  return (
    <div
      className="group relative"
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        aria-expanded={open}
        aria-haspopup="menu"
        onKeyDown={handleTriggerKeyDown}
        tabIndex={-1}
      >
        {trigger}
      </div>
      <ul
        className={`absolute right-0 top-full z-50 mt-2 min-w-56 rounded-md border border-border bg-card p-1 text-card-foreground shadow-lg transition-opacity ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        role="menu"
      >
        {items.map((item, index) => (
          <li key={item.key} role="none">
            <Link
              className="block rounded px-3 py-2 text-sm hover:bg-muted"
              href={item.href}
              onClick={close}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              ref={(el) => { itemRefs.current[index] = el }}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
