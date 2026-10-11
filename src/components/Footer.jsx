import React from 'react'
import { ArrowUp, Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200 py-12 px-6 md:px-12 relative z-30 font-mono text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-1">
            <span>ITZFIZZ</span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600">FRONTEND ANIMATION SHOWCASE</span>
          </div>
          <p className="text-gray-500 text-[11px]">
            Recreated with GSAP ScrollTrigger, React 18, and Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>Original Reference</span>
          </a>

          <a
            href="https://github.com/Kanikashri19/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-gray-800" />
            <span>GitHub Repository</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 transition-all hover:scale-105"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </footer>
  )
}
