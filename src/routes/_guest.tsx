import Navbar from '@/components/navbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  beforeLoad: ({ context }) => {
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
      <Navbar />
      <Outlet />
    </>
  )
}
