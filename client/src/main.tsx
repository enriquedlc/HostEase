import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouterProvider from './Pages/AppRouterProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouterProvider />
  </React.StrictMode>,
)
