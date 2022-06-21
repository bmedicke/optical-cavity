import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import CavityProvider from './Simulator/ctx/CavityContext.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CavityProvider>
      <App />
    </CavityProvider>
  </React.StrictMode>
)
