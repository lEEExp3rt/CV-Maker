import { useEffect, type ReactNode } from 'react'

interface Props {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  wide?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function Modal({
  open, title, children, confirmLabel = '确认', cancelLabel = '取消',
  danger = false, wide = false, onConfirm, onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
      // Don't trigger confirm if focus is in a textarea or input
      const tag = (e.target as HTMLElement).tagName
      if (e.key === 'Enter' && tag !== 'TEXTAREA' && tag !== 'INPUT') onConfirm()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onConfirm, onCancel])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className={`modal-content${wide ? ' modal-wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {cancelLabel && (
            <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button
            className={`modal-btn ${danger ? 'modal-btn-danger' : 'modal-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
