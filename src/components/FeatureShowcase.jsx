import React from 'react'
import { Cpu, Wand2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function FeatureShowcase() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2563eb', '#38bdf8', '#def54f', '#fa7328'],
    })
  }

  const jumpToProgress = (pct) => {
    const heroHeight = window.innerHeight * 2.8
    const targetY = (pct / 100) * (heroHeight - window.innerHeight)
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative bg-[#f8fafc] text-gray-900 border-t border-gray-200 py-20 px-6 md:px-12 z-30">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Replaced green text/border with blue as requested in third image */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-mono font-bold mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>TECHNICAL ARCHITECTURE & SPECIFICATIONS</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight mb-4 text-gray-900">
            ENGINEERED FOR FLUID 60FPS MOTION
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Recreating the reference hero animation with high-performance CSS transforms,
            GSAP ScrollTrigger scrubbing, letter coordinate intersection detection, and real-time audio telemetry.
          </p>
        </div>

        {/* Quick Travel Teleport Buttons */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-mono font-bold text-base flex items-center gap-2 text-gray-900">
                <Wand2 className="w-4 h-4 text-blue-600" />
                Interactive Teleport Controls
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Jump directly to any milestone along the scroll runway to inspect card timings:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: '0% Start', pct: 0 },
                { label: '25% Metric 1', pct: 25 },
                { label: '50% Metric 2', pct: 50 },
                { label: '75% Metric 3', pct: 75 },
                { label: '100% Finish', pct: 100 },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToProgress(item.pct)}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-mono font-semibold text-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={triggerCelebration}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all hover:scale-105 shadow-sm"
              >
                🎉 Confetti
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
