import React from 'react'
import { Activity, Gauge } from 'lucide-react'

export default function TelemetryHUD({ speed = 0, scrollProgress = 0, gear = 1 }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl pointer-events-none">
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-3 md:p-4 shadow-2xl flex items-center justify-between gap-4 font-mono text-gray-900">
        {/* Speedometer */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200">
            <Gauge className="w-5 h-5 text-blue-600" />
            <div
              className="absolute inset-0 rounded-xl border border-blue-500/40 transition-all"
              style={{
                boxShadow: speed > 20 ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none',
              }}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {Math.round(speed)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">KM/H</span>
            </div>
            <div className="text-[10px] text-gray-500 flex items-center gap-1">
              <Activity className="w-3 h-3 text-blue-600" />
              <span>TELEMETRY LIVE</span>
            </div>
          </div>
        </div>

        {/* Throttle & Progress Bar */}
        <div className="hidden sm:flex flex-col flex-1 max-w-[200px] gap-1.5">
          <div className="flex items-center justify-between text-[10px] text-gray-600">
            <span>TRACK DISTANCE</span>
            <span className="text-blue-600 font-bold">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-300">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transition-all duration-75 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-500">
            <span>0 KM</span>
            <span>AERO DRAG: {(speed * 0.008).toFixed(1)} N</span>
            <span>1.2 KM</span>
          </div>
        </div>

        {/* Transmission & Drive Mode */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-gray-500 font-bold">GEARBOX</div>
            <div className="text-lg md:text-xl font-black text-blue-600">
              {speed === 0 ? 'P' : `D${gear}`}
            </div>
          </div>
          {/* Replaced green text with blue */}
          <div className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-bold hidden md:block">
            ACTIVE CORNERING
          </div>
        </div>
      </div>
    </div>
  )
}
