import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  info: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: '' }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error, info: error.message }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[CV-Maker] React render error:', error, errorInfo)
  }

  handleReset = () => {
    // Clear potentially-corrupt localStorage and reload
    try { window.localStorage.removeItem('cv-maker-projects') } catch {}
    try { window.localStorage.removeItem('cv-maker-data') } catch {}
    window.location.replace(import.meta.env.BASE_URL)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', padding: 24,
          fontFamily: 'system-ui, sans-serif', background: '#f8fafc',
          color: '#334155', textAlign: 'center',
        }}>
          <h1 style={{ fontSize: 20, color: '#dc2626', marginBottom: 12 }}>应用加载失败</h1>
          <pre style={{
            maxWidth: 600, padding: 16, background: '#fff',
            border: '1px solid #e2e8f0', borderRadius: 8,
            fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap',
            wordBreak: 'break-word', color: '#475569',
            textAlign: 'left', marginBottom: 16,
          }}>
            {this.state.error.message}
          </pre>
          <button
            onClick={this.handleReset}
            style={{
              padding: '8px 20px', fontSize: 13, fontWeight: 500,
              background: '#1a365d', color: '#fff', border: 'none',
              borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            重置并刷新
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
