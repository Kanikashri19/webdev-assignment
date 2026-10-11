import React from 'react'
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div className="w-full bg-[#d1d1d1] text-[#111] font-sans overflow-x-hidden">
      {/* Top Left Heading in Cyan Box */}
      <div className="fixed top-4 left-4 z-50 text-base sm:text-lg font-bold tracking-tight text-[#111] select-none bg-[#6ac9ff] px-4 py-2 rounded-xl border border-black/15 shadow-md">
        Itzfizz Digital Assignment
      </div>

      {/* Top Right GitHub Link */}
      <a
        href="https://github.com/Kanikashri19/car-scroll-animation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 text-xs font-medium text-gray-700 hover:text-black bg-white/80 hover:bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-300 transition-colors"
      >
        GitHub Repository
      </a>

      {/* Hero Section Animation */}
      <HeroSection />
    </div>
  )
}
