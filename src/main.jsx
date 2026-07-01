import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { loadA11y, applyA11y } from './lib/a11y.js'
import { loadTheme, applyTheme } from './lib/theme.js'
import './index.css'

// apply saved accessibility + color-theme preferences before first paint
applyA11y(loadA11y())
applyTheme(loadTheme())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
