import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.pcss'
import { AuthContextProvider } from './context/AuthContext.tsx'
import LayoutMode from './components/layoutmode/layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LayoutMode>
        <App />
      </LayoutMode>
    </AuthContextProvider>
  </React.StrictMode>,
)
