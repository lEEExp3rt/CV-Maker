import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import type { ResumeData } from '../types/resume'

// A4 page: 297mm total, padding 15mm top + 10mm bottom = 272mm content area.
// Uses border-box so content area matches printable area.
//
// Guard band: 0.99 keeps the page capacity nearly identical to the original
// position-based algorithm (~1018 px).  The print-vs-screen consistency is
// handled by the CSS @media print rules (page-break-inside on entries, not
// sections), so the guard band only needs to absorb sub-pixel rounding.
const PAGE_CONTENT_HEIGHT_MM = 297 - 15 - 10 // 272mm
const MM_TO_PX = 96 / 25.4
const PAGE_CONTENT_HEIGHT_PX = Math.round(PAGE_CONTENT_HEIGHT_MM * MM_TO_PX * 0.99)

// Section title: used ONLY for the estimated gap when a section's
// first entry on a new page needs the duplicated title (the measured
// gap isn't available since the previous entry is on a different page).
//
// font(13pt)*line-height(1.4) + padding-bottom(1mm) + border-bottom(1px)
// + margin-bottom(2mm) ≈ 30 px, plus section margin-bottom(3mm) ≈ 11 px
const SECTION_TITLE_HEIGHT = 42


export interface PaginationResult {
  pageMap: Map<string, number>
  totalPages: number
  measureRef: React.RefObject<HTMLDivElement>
  getEntryPage: (key: string) => number
}

/**
 * Height-based bin-packing pagination.
 *
 * Instead of using absolute positions from the measurement container
 * (which don't match the visible page layout), this algorithm simulates
 * the visible rendering: it packs entries into pages by accumulating
 * their measured heights, adding estimated gaps for section titles and
 * inter-entry margins.
 *
 * This guarantees the page assignments match what the user sees on screen
 * because it mirrors how the visible `<div className="resume-page">`
 * elements actually render.
 */
export function usePagination(data: ResumeData): PaginationResult {
  const [pageMap, setPageMap] = useState<Map<string, number>>(new Map())
  const [totalPages, setTotalPages] = useState(1)
  const measureRef = useRef<HTMLDivElement>(null!)

  useLayoutEffect(() => {
    const container = measureRef.current
    if (!container) return

    const entries = container.querySelectorAll<HTMLElement>('[data-entry-key]')
    if (entries.length === 0) {
      setPageMap(new Map())
      setTotalPages(1)
      return
    }

    const containerRect = container.getBoundingClientRect()
    const computed = getComputedStyle(container)
    const paddingTop = parseFloat(computed.paddingTop) || 0
    const contentTop = containerRect.top + paddingTop

    // Collect entry metadata from the measurement DOM.
    // We capture each entry's top & bottom so we can compute the
    // *actual* rendered gap between consecutive entries (which
    // includes section titles, margins, etc. — no estimation).
    const entryData: { key: string; height: number; top: number; bottom: number }[] = []
    entries.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const top = rect.top - contentTop
      entryData.push({
        key: el.dataset.entryKey!,
        height: rect.height,
        top,
        bottom: top + rect.height,
      })
    })

    // ══════════════════════════════════════════════════════════════
    // Height-based bin packing (measured gaps, minimal estimation)
    // ══════════════════════════════════════════════════════════════

    const map = new Map<string, number>()
    let pageIdx = 0

    // The first entry's absolute top equals the space taken by
    // PersonalInfo + first section title — content without data-entry-key
    // that only appears on page 0.
    let pageHeight = entryData.length > 0 ? entryData[0].top : 0
    let prevIdx = -1 // index of previous entry on the same page

    for (let i = 0; i < entryData.length; i++) {
      const entry = entryData[i]
      const { key, height } = entry

      // Gap before this entry:
      // - Same page (prevIdx >= 0): use the measured gap from the DOM.
      //   This includes section titles, margins — exactly as rendered.
      // - First entry on a new page (prevIdx < 0, pageIdx > 0): the
      //   visible page renders a section title above this entry.
      //   We estimate it (~42 px) because the measurement can't help
      //   (the previous entry is on a different page).
      let gap = 0
      if (prevIdx >= 0) {
        gap = entry.top - entryData[prevIdx].bottom
      } else if (pageIdx > 0) {
        gap = SECTION_TITLE_HEIGHT
      }

      if (pageHeight + gap + height > PAGE_CONTENT_HEIGHT_PX && pageHeight > 0) {
        // Current page is full — start a new page
        pageIdx++
        pageHeight = 0
        prevIdx = -1

        // First entry on the new page needs its section title
        gap = SECTION_TITLE_HEIGHT
      }

      map.set(key, pageIdx)
      pageHeight += gap + height
      prevIdx = i
    }

    const maxPage = map.size > 0 ? Math.max(...map.values()) : 0
    setPageMap(map)
    setTotalPages(maxPage + 1)
  }, [data])

  const getEntryPage = useCallback(
    (key: string) => pageMap.get(key) ?? 0,
    [pageMap],
  )

  return { pageMap, totalPages, measureRef, getEntryPage }
}
