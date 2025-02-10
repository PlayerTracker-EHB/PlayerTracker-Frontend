import Navbar from '@/components/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
})

function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
