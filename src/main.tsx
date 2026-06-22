import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage'
import EditorApp from './EditorApp'
import DemoPage from './DemoPage'
import './styles/global.css'
import './styles/resume.css'

const path = window.location.pathname

let App: React.ComponentType
if (path === '/editor') {
  App = EditorApp
} else if (path === '/examples') {
  App = DemoPage
} else {
  App = HomePage
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
