import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import UserProvider from './context/user/userProvider.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'

createRoot(document.getElementById('root')!).render(
  
  

  <StrictMode>
    
    <ThemeProvider>

    <UserProvider >

    <BrowserRouter  >
    <App />
    </BrowserRouter>
    </UserProvider>
    </ThemeProvider>
  </StrictMode>,
 
 
)
