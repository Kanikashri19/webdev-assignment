import React from 'react'
import { CheckCircle2, Cpu, Flame, Layers, Sparkles, Terminal, Wand2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function FeatureShowcase() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#45db7d', '#def54f', '#6ac9ff', '#fa7328'],
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
    <section className="relative bg-[#151515] text-white border-t border-white/10 py-24 px-6 md:px-12 z-30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#45db7d]/10 text-[#45db7d] border border-[#45db7d]/20 text-xs font-mono font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL ARCHITECTURE & SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight mb-4">
            ENGINEERED FOR FLUID 60FPS MOTION
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Recreating the reference hero animation with high-performance CSS transforms,
            GSAP ScrollTrigger scrubbing, letter coordinate intersection detection, and real-time audio telemetry.
          </p>
        </div>

        {/* Quick Travel Teleport Buttons */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 mb-16 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-mono font-bold text-base flex items-center gap-2 text-white">
                <Wand2 className="w-4 h-4 text-[#def54f]" />
                Interactive Teleport Controls
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Jump directly to any milestone along the scroll runway to inspect card timings:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: '0% Start', pct: 0, color: '#ffffff' },
                { label: '25% Metric 1', pct: 25, color: '#def54f' },
                { label: '50% Metric 2', pct: 50, color: '#6ac9ff' },
                { label: '75% Metric 3', pct: 75, color: '#ffffff' },
                { label: '100% Finish', pct: 100, color: '#fa7328' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToProgress(item.pct)}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95"
                  style={{ color: item.color }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={triggerCelebration}
                className="px-3.5 py-1.5 rounded-lg bg-[#45db7d] hover:bg-[#3ec46f] text-black text-xs font-mono font-bold transition-all hover:scale-105 shadow-glow-green/30"
              >
                🎉 Confetti
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-[#45db7d]/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#45db7d]/10 text-[#45db7d] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg mb-2">Sticky Pin & Scrub</h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Utilizes GSAP ScrollTrigger pinning across a virtual runway of 280vh, locking the viewport while mapping scroll position to exact car coordinate transformations with <code className="text-[#45db7d]">scrub: 0.8</code> easing.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#45db7d]" />
              <span>Zero layout reflow during scroll</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-[#def54f]/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#def54f]/10 text-[#def54f] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg mb-2">Letter Collision Sync</h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Dynamically caches the horizontal centers of each letter in <code className="text-[#def54f]">"WELCOME ITZFIZZ"</code>. As the supercar bumper passes each coordinate, it triggers an instant neon luminescence and scale shift.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#def54f]" />
              <span>Pixel-perfect synchronized illumination</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-[#fa7328]/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#fa7328]/10 text-[#fa7328] flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg mb-2">Dynamic Telemetry Engine</h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Computes instantaneous velocity (<code className="text-[#fa7328]">&Delta;y / &Delta;t</code>) with exponential smoothing, simulating live speedometer readouts up to 295 km/h, gear shifting, and Web Audio API engine harmonics.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#fa7328]" />
              <span>Synthetic Web Audio frequency synthesis</span>
            </div>
          </div>
        </div>

        {/* Technical Stack Pill Matrix */}
        <div className="border border-white/10 rounded-2xl p-8 bg-black/40">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6 text-center">
            MANDATORY STACK SPECIFICATION COMPLIANCE
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: 'React 18', desc: 'Reactive Component State', tag: 'Core' },
              { name: 'GSAP 3.12', desc: 'ScrollTrigger & Timelines', tag: 'Animation' },
              { name: 'Tailwind CSS', desc: 'Utility Design System', tag: 'Styling' },
              { name: 'Vite 6', desc: 'Blazing Fast Bundling', tag: 'Build' },
              { name: 'Web Audio API', desc: 'Interactive Sound Engine', tag: 'Audio' },
              { name: 'GitHub Pages', desc: 'Automated CI/CD Host', tag: 'Deploy' },
            ].map((tech, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#45db7d] uppercase tracking-wider mb-1">{tech.tag}</span>
                <span className="font-mono font-bold text-sm text-white">{tech.name}</span>
                <span className="text-[10px] text-zinc-400 mt-1">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
