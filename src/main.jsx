import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import App from './components/App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  </StrictMode>,
)
