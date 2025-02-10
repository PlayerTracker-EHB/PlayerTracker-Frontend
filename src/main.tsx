import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

//import css
import "./index.css";

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './auth/authStore';
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuthStore()
  return (
    <StrictMode>
      <RouterProvider router={router} context={{ auth }} />
    </StrictMode>
  )
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <App />
  )
}
