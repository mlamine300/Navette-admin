import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import UserProvider from './context/user/userProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  
  

  <StrictMode>
    <UserProvider >

    <BrowserRouter  >
    <App />
    </BrowserRouter>
    </UserProvider>
  </StrictMode>,
 
 
)
