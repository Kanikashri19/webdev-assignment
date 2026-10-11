import React from 'react'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

export default function MetricCard({
  id,
  number,
  unit = "%",
  title,
  subtext,
  bgColor,
  textColor,
  accentColor,
  icon: IconType,
  positionClasses,
  isPositive = true,
  cardRef,
}) {
  return (
    <div
      ref={cardRef}
      id={id}
      className={`absolute z-30 transition-all duration-300 pointer-events-auto select-none ${positionClasses}`}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <div
        className="group relative rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-xl border border-black/10 hover:scale-[1.03] transition-transform duration-300 cursor-default"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          boxShadow: `0 15px 30px -10px ${accentColor}50, 0 8px 15px -5px rgba(0,0,0,0.1)`,
        }}
      >
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-50" />

        {/* Header row with badge & icon */}
        <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase border"
            style={{
              backgroundColor: 'rgba(0,0,0,0.06)',
              borderColor: 'rgba(0,0,0,0.12)',
              color: textColor,
            }}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-blue-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-blue-600" />
            )}
            <span>{isPositive ? 'OPTIMIZED' : 'REDUCED'}</span>
          </div>

          <div
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-80"
            style={{
              backgroundColor: 'rgba(0,0,0,0.08)',
              color: textColor,
            }}
          >
            {IconType ? <IconType className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
          </div>
        </div>

        {/* Big Impact Metric Value */}
        <div className="relative z-10 flex items-baseline gap-1 my-1">
          <span className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight font-mono metric-number leading-none">
            {number}
          </span>
          <span className="text-2xl sm:text-3xl font-bold opacity-80">{unit}</span>
        </div>

        {/* Description Label */}
        <p className="relative z-10 text-xs sm:text-sm font-semibold tracking-normal mt-1 leading-snug max-w-[200px]">
          {title}
        </p>

        {subtext && (
          <p className="relative z-10 text-[11px] opacity-75 mt-1 font-mono">
            {subtext}
          </p>
        )}
      </div>
    </div>
  )
}
