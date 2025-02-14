import { AuthState } from '@/store/authStore'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/toaster"

interface RouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
})
