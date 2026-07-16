import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import type { ResumeData } from '../types/resume'

// A4 page: 297mm total, padding 15mm top + 10mm bottom = 272mm content area.
// Uses border-box so content area matches printable area.
// 1% guard band: print `height:297mm;overflow:hidden` clips content that
// barely exceeds the page boundary.  The ~10 px headroom per page absorbs
// sub-pixel rounding differences between screen measurement and print
// layout without materially changing page fullness.
const PAGE_CONTENT_HEIGHT_MM = 297 - 15 - 10 // 272mm
const MM_TO_PX = 96 / 25.4
const PAGE_CONTENT_HEIGHT_PX = Math.round(PAGE_CONTENT_HEIGHT_MM * MM_TO_PX * 0.99) // ~1018px

export interface PaginationResult {
  /** Map of entry key → page index */
  pageMap: Map<string, number>
  /** Total number of pages */
  totalPages: number
  /** Ref to attach to the measurement container */
  measureRef: React.RefObject<HTMLDivElement>
  /** Check if an entry belongs to a specific page */
  getEntryPage: (key: string) => number
}

/**
 * Measures rendered entry positions and computes page-break assignments.
 *
 * Rules:
 *  - Each entry (`.resume-entry`, skill category, award row) is atomic — never split.
 *  - If an entry crosses the current page boundary, it moves entirely to the next page.
 *  - Entries are identified by `data-entry-key` attributes on section components.
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

    // cursor = bottom edge of current page's content area (relative to content top)
    let cursor = PAGE_CONTENT_HEIGHT_PX
    const map = new Map<string, number>()

    entries.forEach((el) => {
      const key = el.dataset.entryKey!
      const rect = el.getBoundingClientRect()
      const entryTop = rect.top - contentTop
      const entryBottom = rect.bottom - contentTop

      // Advance cursor until entry starts within the current page
      while (cursor <= entryTop) {
        cursor += PAGE_CONTENT_HEIGHT_PX
      }

      // If entry extends beyond current page, push it to the next page
      if (entryBottom > cursor) {
        cursor += PAGE_CONTENT_HEIGHT_PX
        // Handle edge case: a single entry taller than a full page
        while (entryBottom > cursor) {
          cursor += PAGE_CONTENT_HEIGHT_PX
        }
      }

      const pageIndex = Math.round(cursor / PAGE_CONTENT_HEIGHT_PX) - 1
      map.set(key, pageIndex)
    })

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
