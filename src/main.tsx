import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage'
import EditorApp from './EditorApp'
import DocsPage from './DocsPage'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/global.css'
import './styles/resume.css'

// Restore SPA route after GitHub Pages 404 redirect
const redirect = sessionStorage.getItem('redirect')
if (redirect) {
  sessionStorage.removeItem('redirect')
  window.history.replaceState({}, '', redirect)
}

const path = window.location.pathname

let App: React.ComponentType
if (path.endsWith('/editor') || path.includes('/editor')) {
  App = EditorApp
} else if (path.includes('/docs')) {
  App = DocsPage
} else {
  App = HomePage
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
