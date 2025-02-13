import NavBar from '@/components/navbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  beforeLoad: async ({ context }) => {
    if (context.auth.user) {
      throw redirect({
        to: '/Statistics',
      })
    }
  },
  component: GuestLayout
})

function GuestLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
