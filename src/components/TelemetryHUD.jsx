import React from 'react'
import { Activity, Gauge, Navigation2, Zap } from 'lucide-react'

export default function TelemetryHUD({ speed = 0, scrollProgress = 0, gear = 1 }) {
  // Compute throttle percentage from speed (normalized to 320 km/h)
  const throttlePct = Math.min(100, Math.round((speed / 280) * 100))

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl pointer-events-none">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-glass flex items-center justify-between gap-4 font-mono">
        {/* Speedometer */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10">
            <Gauge className="w-5 h-5 text-[#45db7d]" />
            <div
              className="absolute inset-0 rounded-xl border border-[#45db7d] transition-all opacity-40"
              style={{
                boxShadow: speed > 20 ? '0 0 15px rgba(69, 219, 125, 0.5)' : 'none',
              }}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {Math.round(speed)}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">KM/H</span>
            </div>
            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#def54f]" />
              <span>TELEMETRY LIVE</span>
            </div>
          </div>
        </div>

        {/* Throttle & Progress Bar */}
        <div className="hidden sm:flex flex-col flex-1 max-w-[200px] gap-1.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>TRACK DISTANCE</span>
            <span className="text-[#45db7d] font-bold">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#45db7d] via-[#def54f] to-[#fa7328] transition-all duration-75 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-zinc-500">
            <span>0 KM</span>
            <span>AERO DRAG: {(speed * 0.008).toFixed(1)} N</span>
            <span>1.2 KM</span>
          </div>
        </div>

        {/* Transmission & Drive Mode */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-zinc-400">GEARBOX</div>
            <div className="text-lg md:text-xl font-black text-[#def54f]">
              {speed === 0 ? 'P' : `D${gear}`}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#45db7d]/10 border border-[#45db7d]/30 text-[#45db7d] text-[11px] font-bold hidden md:block">
            ACTIVE CORNERING
          </div>
        </div>
      </div>
    </div>
  )
}
