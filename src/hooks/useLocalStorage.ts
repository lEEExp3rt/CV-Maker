import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T, validate?: (parsed: unknown) => parsed is T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return initialValue
      const parsed = JSON.parse(item)
      // Validate data shape if a validator is provided; fall back to initialValue on mismatch
      if (validate && !validate(parsed)) {
        window.localStorage.removeItem(key)
        return initialValue
      }
      return parsed as T
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue))
        } catch { /* quota exceeded, silently fail */ }
        return nextValue
      })
    },
    [key]
  )

  return [storedValue, setValue]
}
