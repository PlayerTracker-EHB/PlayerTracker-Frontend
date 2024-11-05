import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" 


createRoot(document.getElementById('root')!).render(
  <SidebarProvider defaultOpen={false}> 
      <AppSidebar />
    <SidebarTrigger className="top-6 left-4 z-50 bg-transparent p-[4px] rounded-full shadow-lg" />
  <StrictMode>

    <App />
  </StrictMode>
      </SidebarProvider>,
  
)
