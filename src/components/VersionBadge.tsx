import { useState } from 'react'
import pkg from '../../package.json'
import Modal from './editor/Modal'
import MarkdownPage from './MarkdownPage'
import changelogRaw from '../../CHANGELOG.md?raw'

interface Props {
  variant?: 'nav' | 'text'
}

export default function VersionBadge({ variant = 'nav' }: Props) {
  const [show, setShow] = useState(false)

  const isText = variant === 'text'

  return (
    <>
      <button
        onClick={() => setShow(true)}
        title="点击查看变更日志"
        style={isText ? {
          padding: 0, fontSize: 14, fontWeight: 400, border: 'none', background: 'none',
          color: '#94a3b8', cursor: 'pointer', fontFamily: 'inherit',
          textDecoration: 'underline', textUnderlineOffset: 3,
          textDecorationColor: '#cbd5e0',
        } : {
          padding: '2px 8px', fontSize: 10, fontWeight: 500,
          color: '#64748b', background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => {
          if (isText) (e.target as HTMLElement).style.color = '#475569'
        }}
        onMouseLeave={(e) => {
          if (isText) (e.target as HTMLElement).style.color = '#94a3b8'
        }}
      >
        v{pkg.version}
      </button>

      {show && (
        <Modal
          open={show}
          title="变更日志"
          confirmLabel="关闭"
          cancelLabel=""
          wide
          onConfirm={() => setShow(false)}
          onCancel={() => setShow(false)}
        >
          <MarkdownPage content={changelogRaw} />
        </Modal>
      )}
    </>
  )
}
