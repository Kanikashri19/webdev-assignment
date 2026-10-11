import React from 'react'
import { ArrowUp, Github, ExternalLink, Heart } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 py-12 px-6 md:px-12 relative z-30 font-mono text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
            <span>ITZFIZZ</span>
            <span className="text-zinc-600">/</span>
            <span className="text-[#45db7d]">FRONTEND ANIMATION SHOWCASE</span>
          </div>
          <p className="text-zinc-500 text-[11px]">
            Recreated with GSAP ScrollTrigger, React 18, and Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#def54f]" />
            <span>Original Reference</span>
          </a>

          <a
            href="https://github.com/Kanikashri19/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#45db7d]" />
            <span>GitHub Repository</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white transition-all hover:scale-105"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
