import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
})
