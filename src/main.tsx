import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage'
import EditorApp from './EditorApp'
import DocsPage from './DocsPage'
import './styles/global.css'
import './styles/resume.css'

const path = window.location.pathname

let App: React.ComponentType
if (path === '/editor') {
  App = EditorApp
} else if (path.startsWith('/docs')) {
  App = DocsPage
} else {
  App = HomePage
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
