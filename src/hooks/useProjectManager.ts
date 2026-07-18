import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Project, ProjectStore } from '../types/project'
import type { ResumeData } from '../types/resume'
import { DEFAULT_RESUME_DATA } from '../data/defaults'

const STORAGE_KEY = 'cv-maker-projects'
const LEGACY_KEY = 'cv-maker-data'

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function now(): string {
  return new Date().toISOString()
}

function makeProject(title: string, data?: ResumeData): Project {
  return {
    id: uid(),
    title,
    createdAt: now(),
    updatedAt: now(),
    data: data ?? JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA)),
  }
}

/** Validate that localStorage data matches the expected ProjectStore shape */
function isValidProjectStore(parsed: unknown): parsed is ProjectStore {
  if (!parsed || typeof parsed !== 'object') return false
  const s = parsed as Record<string, unknown>
  if (typeof s.active !== 'string') return false
  if (!Array.isArray(s.projects)) return false
  return s.projects.every(
    (p: unknown) =>
      p !== null &&
      typeof p === 'object' &&
      typeof (p as Record<string, unknown>).id === 'string' &&
      typeof (p as Record<string, unknown>).title === 'string',
  )
}

export function useProjectManager() {
  const [store, setStore] = useLocalStorage<ProjectStore>(
    STORAGE_KEY,
    { active: '', projects: [] },
    isValidProjectStore,
  )

  // One-time initialization: migrate legacy data and ensure at least one project.
  // Using a ref + useEffect avoids calling setStore during render (React anti-pattern).
  const initialized = useRef(false)

  useLayoutEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Migrate legacy single-key data on first load
    const projects = store.projects
    if (projects.length === 0) {
      try {
        const legacy = window.localStorage.getItem(LEGACY_KEY)
        if (legacy) {
          const data = JSON.parse(legacy) as ResumeData
          const project = makeProject('我的简历', data)
          setStore({ active: project.id, projects: [project] })
          window.localStorage.removeItem(LEGACY_KEY)
          return
        }
      } catch { /* ignore */ }
    }

    // Ensure at least one project
    if (projects.length === 0 && store.active === '') {
      const project = makeProject('我的简历')
      setStore({ active: project.id, projects: [project] })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const projects = store.projects
  const activeId = store.active

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) ?? projects[0],
    [projects, activeId]
  )

  const switchProject = useCallback(
    (id: string) => setStore((s) => ({ ...s, active: id })),
    [setStore]
  )

  const createProject = useCallback(
    (title: string) => {
      const project = makeProject(title)
      setStore((s) => ({
        active: project.id,
        projects: [...s.projects, project],
      }))
      return project
    },
    [setStore]
  )

  const duplicateProject = useCallback(
    (id: string) => {
      const source = store.projects.find((p) => p.id === id)
      if (!source) return
      const copy = makeProject(
        source.title + ' (副本)',
        JSON.parse(JSON.stringify(source.data))
      )
      setStore((s) => ({
        active: copy.id,
        projects: [...s.projects, copy],
      }))
    },
    [store.projects, setStore]
  )

  const deleteProject = useCallback(
    (id: string) => {
      setStore((s) => {
        if (s.projects.length <= 1) return s
        const filtered = s.projects.filter((p) => p.id !== id)
        return {
          active: filtered[0].id,
          projects: filtered,
        }
      })
    },
    [setStore]
  )

  const renameProject = useCallback(
    (id: string, title: string) => {
      setStore((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === id ? { ...p, title, updatedAt: now() } : p
        ),
      }))
    },
    [setStore]
  )

  const updateActiveData = useCallback(
    (data: ResumeData) => {
      if (!activeProject) return
      setStore((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === s.active ? { ...p, data, updatedAt: now() } : p
        ),
      }))
    },
    [activeProject, setStore]
  )

  return {
    projects,
    activeProject,
    switchProject,
    createProject,
    duplicateProject,
    deleteProject,
    renameProject,
    updateActiveData,
  }
}
