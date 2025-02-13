import { createFileRoute } from '@tanstack/react-router'
import Pricing from '@/components/landing/Pricing'

export const Route = createFileRoute('/_guest/Subscriptions')({
  component: Subscriptions,
})

function Subscriptions() {
  return (
    <Pricing />
  )
}
