import React from 'react'
import { Sparkles, Gauge, Github, Volume2, VolumeX, ArrowDown } from 'lucide-react'

export default function Navbar({ isAudioEnabled, toggleAudio, scrollProgress }) {
  const scrollToDemo = () => {
    window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 backdrop-blur-md bg-black/40 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#45db7d] to-[#def54f] flex items-center justify-center shadow-glow-green/50 shadow-md">
            <Gauge className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base md:text-lg text-white font-mono">
                ITZFIZZ
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#45db7d]/20 text-[#45db7d] border border-[#45db7d]/30">
                PRO ENGINE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">Scroll-Driven Hero Showcase</p>
          </div>
        </div>

        {/* Live Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-full px-4 py-1.5 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45db7d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45db7d]"></span>
            </span>
            <span className="text-zinc-400">GSAP PIN:</span>
            <span className="text-[#45db7d] font-semibold">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="text-zinc-400">FPS: <span className="text-white">60.0</span></div>
          <div className="w-px h-3 bg-white/15" />
          <div className="text-zinc-400">TRACK: <span className="text-white">McLAREN 720S</span></div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Audio Engine Button */}
          <button
            onClick={toggleAudio}
            className={`p-2 md:px-3 md:py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border ${
              isAudioEnabled
                ? 'bg-[#45db7d]/15 text-[#45db7d] border-[#45db7d]/40 shadow-glow-green/30'
                : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
            title="Toggle Engine Audio Synthesis"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{isAudioEnabled ? 'AUDIO ON' : 'SFX OFF'}</span>
          </button>

          {/* Scroll CTA Button */}
          <button
            onClick={scrollToDemo}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-white transition-all"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#def54f]" />
            <span>Drive</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/Kanikashri19/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:px-3 md:py-1.5 rounded-lg bg-[#def54f] hover:bg-[#cde43f] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-glow-lime/30 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Source Code</span>
          </a>
        </div>
      </div>
    </header>
  )
}
