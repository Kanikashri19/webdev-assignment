import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureShowcase from './components/FeatureShowcase'
import Footer from './components/Footer'

export default function App() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans selection:bg-[#45db7d] selection:text-black">
      {/* Top Floating Navbar */}
      <Navbar
        isAudioEnabled={isAudioEnabled}
        toggleAudio={toggleAudio}
        scrollProgress={scrollProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Core Scroll-Driven Hero Section (Pinned Above-The-Fold & Scrolled) */}
        <HeroSection
          isAudioEnabled={isAudioEnabled}
          onScrollProgressChange={setScrollProgress}
        />

        {/* Feature Highlights & Engineering Specifications */}
        <FeatureShowcase />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
