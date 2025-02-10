import About from '@/components/about'
import Carousel2 from '@/components/carousel2'
import CoverSection from '@/components/cover-section'
import SplashScreen from '@/components/SplashScreen'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_guest/')({
  component: Index,
})

function Index() {
  const [splashFinished, setSplashFinished] = useState(false)

  return !splashFinished ? (
    <SplashScreen onFinish={() => setSplashFinished(true)} />
  ) : (
    <div>
      <CoverSection />
      <hr className="w-full border-t-2 border-gray-300" />
      <div className="bg-white flex items-center justify-center overflow-hidden">
        <Carousel2 />
      </div>
      <hr className="w-full border-t-2 border-gray-300" />
      <About />
    </div>
  )
}
