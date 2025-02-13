import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

//import css
import "./index.css";

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './store/authStore';
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

// main.tsx
function App() {
  const auth = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  const queryClient = new QueryClient()
  useEffect(() => {
    // Initialize auth state
    auth.fetchUser().finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />
      </QueryClientProvider>
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
