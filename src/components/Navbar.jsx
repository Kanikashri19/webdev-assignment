import React from 'react'
import { Sparkles, Gauge, Github, Volume2, VolumeX, ArrowDown } from 'lucide-react'

export default function Navbar({ isAudioEnabled, toggleAudio, scrollProgress }) {
  const scrollToDemo = () => {
    window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 backdrop-blur-md bg-white/85 border-b border-gray-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md text-white">
            <Gauge className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base md:text-lg text-gray-900 font-mono">
                ITZFIZZ
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                PRO ENGINE
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block">Scroll-Driven Hero Showcase</p>
          </div>
        </div>

        {/* Live Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-4 bg-gray-100/90 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-mono text-gray-700">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-gray-500">GSAP PIN:</span>
            <span className="text-blue-600 font-bold">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="text-gray-500">FPS: <span className="text-gray-900 font-semibold">60.0</span></div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="text-gray-500">TRACK: <span className="text-gray-900 font-semibold">McLAREN 720S</span></div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Audio Engine Button */}
          <button
            onClick={toggleAudio}
            className={`p-2 md:px-3 md:py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border ${
              isAudioEnabled
                ? 'bg-blue-50 text-blue-600 border-blue-300 shadow-sm'
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-200'
            }`}
            title="Toggle Engine Audio Synthesis"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 animate-pulse text-blue-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{isAudioEnabled ? 'AUDIO ON' : 'SFX OFF'}</span>
          </button>

          {/* Scroll CTA Button */}
          <button
            onClick={scrollToDemo}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-semibold text-gray-700 transition-all"
          >
            <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Drive</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/Kanikashri19/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:px-3 md:py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Source Code</span>
          </a>
        </div>
      </div>
    </header>
  )
}
