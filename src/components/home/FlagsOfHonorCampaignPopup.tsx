'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const dismissStorageKey = 'flags-of-honor-campaign-dismissed'
const sponsorHref = '/projects/flags-of-honor/donate'
const learnMoreHref = '/projects/flags-of-honor'

export function FlagsOfHonorCampaignPopup() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    try {
      const dismissed = window.sessionStorage.getItem(dismissStorageKey) === 'true'
      const shouldOpenByDefault = window.innerWidth >= 640
      setIsOpen(!dismissed && shouldOpenByDefault)
    } catch {
      setIsOpen(true)
    }
  }, [])

  const openPopup = () => {
    setIsOpen(true)

    try {
      window.sessionStorage.removeItem(dismissStorageKey)
    } catch {
      // Ignore storage failures and keep the popup interactive.
    }
  }

  const closePopup = () => {
    setIsOpen(false)

    try {
      window.sessionStorage.setItem(dismissStorageKey, 'true')
    } catch {
      // Ignore storage failures and keep the popup interactive.
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="pointer-events-auto ml-auto flex w-full max-w-[360px] flex-col items-end gap-3">
        {isOpen ? (
          <section
            id="flags-of-honor-popup"
            className="relative w-full max-w-[332px] overflow-hidden rounded-[24px] border border-[#d9d7cf] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(7,16,43,0.22)] transition-all duration-300 sm:max-w-[360px] sm:p-5"
            aria-label="Flags of Honor sponsorship announcement"
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 rounded-full border border-[#d9d7cf] bg-white p-1.5 text-[#6b7280] transition-colors hover:text-[#122047]"
              aria-label="Close Flags of Honor popup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-8 text-center">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5b6780]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                America&apos;s 250th
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8a11a]" />
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8a11a]" />
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8a11a]" />
              </div>
              <h2
                className="mt-3 text-[26px] font-semibold leading-[1.08] text-[#122047] sm:text-[31px]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Flags of Honor 2026
              </h2>
              <p
                className="mt-3 text-[14px] leading-6 text-[#556173] sm:text-[15px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Support the patriotic display in Triangle Park and help us honor our heroes during
                America&apos;s 250th celebration year.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <Button
                asChild
                className="h-12 w-full rounded-full bg-[var(--color-primary)] text-base font-semibold text-white shadow-[0_16px_30px_rgba(0,61,165,0.24)] hover:bg-[var(--color-primary-dark)]"
              >
                <Link
                  href={sponsorHref}
                  style={{ color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 700 }}
                >
                  Become a Sponsor
                </Link>
              </Button>
              <Link
                href={learnMoreHref}
                className="text-center text-[15px] font-semibold text-[#44536d] underline underline-offset-4 transition-colors hover:text-[#122047]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Learn More
              </Link>
            </div>
          </section>
        ) : null}

        <button
          type="button"
          onClick={isOpen ? closePopup : openPopup}
          className="flex items-center gap-3 rounded-full border border-white/35 px-4 py-3 text-left shadow-[0_20px_40px_rgba(8,22,57,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
          aria-expanded={isOpen}
          aria-controls="flags-of-honor-popup"
          style={{
            background: 'linear-gradient(135deg, #1849a6 0%, #0f347d 100%)',
          }}
        >
          <span className="relative block h-5 w-7 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-white/45">
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, #b22234 0px, #b22234 2px, #ffffff 2px, #ffffff 4px)',
              }}
            />
            <span className="absolute left-0 top-0 h-[11px] w-[12px] bg-[#3c3b6e]" />
          </span>
          <span className="grid gap-0.5">
            <span
              className="text-[14px] font-semibold leading-none text-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Flags of Honor
            </span>
            <span
              className="text-[13px] leading-none text-white/80"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              2026
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}
