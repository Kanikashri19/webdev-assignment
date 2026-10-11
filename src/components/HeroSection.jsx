import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MetricCard from './MetricCard'
import TelemetryHUD from './TelemetryHUD'
import { TrendingUp, Award, Zap, PhoneCall, ChevronDown, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LETTERS = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
]

export default function HeroSection({ isAudioEnabled, onScrollProgressChange }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const lettersRef = useRef([])
  const headlineContainerRef = useRef(null)

  const box1Ref = useRef(null)
  const box2Ref = useRef(null)
  const box3Ref = useRef(null)
  const box4Ref = useRef(null)

  // Real-time telemetry state
  const [speed, setSpeed] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [gear, setGear] = useState(1)

  // Audio synthesis ref
  const audioContextRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)

  // Initialize Web Audio API for interactive engine sound
  useEffect(() => {
    if (!isAudioEnabled) {
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend()
      }
      return
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!audioContextRef.current) {
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(60, ctx.currentTime)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(350, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        osc.start()

        audioContextRef.current = ctx
        oscRef.current = osc
        gainRef.current = gain
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e)
    }

    return () => {
      // Keep context alive or suspend
    }
  }, [isAudioEnabled])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current
      const trail = trailRef.current
      const letters = lettersRef.current.filter(Boolean)
      const road = roadRef.current
      const container = containerRef.current
      const track = trackRef.current

      if (!car || !road || !container) return

      // --- INITIAL LOAD ANIMATION (Requirement 2) ---
      // Fade in & staggered reveal of headline letters and badge
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Headline intro
      introTl.fromTo(
        letters,
        {
          opacity: 0,
          y: 35,
          scale: 0.85,
        },
        {
          opacity: 0.18, // Subtle base visibility above the fold
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.035,
          delay: 0.1,
        }
      )

      // Car engine ready slide
      introTl.fromTo(
        car,
        {
          x: -120,
          opacity: 0,
          filter: 'drop-shadow(0 0 0px rgba(69,219,125,0))',
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          filter: 'drop-shadow(0 0 25px rgba(69,219,125,0.4))',
          ease: 'power2.out',
        },
        '-=0.6'
      )

      // Initial stats preview hint
      introTl.fromTo(
        ['#box1', '#box2', '#box3', '#box4'],
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 0, // Controlled by scroll trigger
          scale: 1,
          y: 0,
          duration: 0.5,
        },
        '-=0.4'
      )

      // --- SCROLL-DRIVEN ANIMATION (Requirement 3 & 4) ---
      // Measure dimensions accurately
      const updateDimensionsAndAnimation = () => {
        const roadRect = road.getBoundingClientRect()
        const carRect = car.getBoundingClientRect()
        const carWidth = carRect.width || 180
        const endX = roadRect.width - carWidth

        // Cache letter offsets relative to road left
        const letterData = letters.map((el) => {
          const rect = el.getBoundingClientRect()
          return {
            el,
            center: rect.left + rect.width / 2,
          }
        })

        // Velocity tracking variables
        let lastScrollY = window.scrollY
        let lastTime = performance.now()
        let currentVelocity = 0

        // Main Car Travel ScrollTrigger
        const mainScrollTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8, // Buttery smooth interpolation
          onUpdate: (self) => {
            const progress = self.progress
            const currentX = progress * endX
            const progressPct = progress * 100

            setScrollPct(progressPct)
            if (onScrollProgressChange) {
              onScrollProgressChange(progressPct)
            }

            // Move car along road
            gsap.set(car, { x: currentX })

            // Expand neon trail behind car
            const trailWidth = currentX + carWidth * 0.45
            gsap.set(trail, { width: Math.max(0, trailWidth) })

            // Dynamic Car Drift Tilt based on direction and speed
            const now = performance.now()
            const dt = (now - lastTime) / 1000
            const dy = window.scrollY - lastScrollY
            lastScrollY = window.scrollY
            lastTime = now

            if (dt > 0) {
              const rawVelocity = Math.abs(dy / dt)
              currentVelocity = currentVelocity * 0.8 + rawVelocity * 0.2
            }

            // Compute speed in km/h (capped at 295 km/h for McLaren 720S)
            const computedSpeed = Math.min(295, currentVelocity * 0.12)
            setSpeed(computedSpeed)

            // Dynamic gear shifting
            const currentGear = Math.min(7, Math.max(1, Math.floor(computedSpeed / 40) + 1))
            setGear(currentGear)

            // Dynamic engine audio modulation
            if (gainRef.current && oscRef.current && isAudioEnabled) {
              const targetGain = Math.min(0.15, computedSpeed / 2000)
              const targetFreq = 70 + (computedSpeed * 1.5)
              const ctx = audioContextRef.current
              if (ctx) {
                gainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05)
                oscRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.05)
              }
            }

            // Tilt car slightly during motion
            const tiltAngle = Math.min(3, Math.max(-3, (dy / 30)))
            gsap.set(car, { rotation: tiltAngle })

            // Reveal headline letters when car reaches each letter
            const currentCarGlobalX = road.getBoundingClientRect().left + currentX + carWidth * 0.55

            letterData.forEach(({ el, center }) => {
              if (currentCarGlobalX >= center) {
                // Activated state: Bright neon glow & crisp white
                el.style.opacity = '1'
                el.style.color = '#ffffff'
                el.style.textShadow = '0 0 25px rgba(69, 219, 125, 0.9), 0 0 50px rgba(69, 219, 125, 0.5)'
                el.style.transform = 'translateY(-2px) scale(1.05)'
              } else {
                // Dim unpassed state
                el.style.opacity = '0.18'
                el.style.color = '#71717a'
                el.style.textShadow = 'none'
                el.style.transform = 'translateY(0) scale(1)'
              }
            })
          },
        })

        // --- STAGGERED METRIC CARDS (Requirement 2 & 3) ---
        // Box 1: 58% Increase in pick up point use (Volt Lime)
        gsap.fromTo(
          '#box1',
          { opacity: 0, y: 50, scale: 0.85 },
          {
            scrollTrigger: {
              trigger: container,
              start: 'top+=15% top',
              end: 'top+=35% top',
              scrub: 0.6,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        )

        // Box 2: 23% Decreased in customer phone calls (Electric Cyan)
        gsap.fromTo(
          '#box2',
          { opacity: 0, y: -50, scale: 0.85 },
          {
            scrollTrigger: {
              trigger: container,
              start: 'top+=35% top',
              end: 'top+=55% top',
              scrub: 0.6,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        )

        // Box 3: 27% Surge in delivery velocity (Carbon Dark)
        gsap.fromTo(
          '#box3',
          { opacity: 0, y: 50, scale: 0.85 },
          {
            scrollTrigger: {
              trigger: container,
              start: 'top+=55% top',
              end: 'top+=75% top',
              scrub: 0.6,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        )

        // Box 4: 40% Decreased customer support inquiries (Flame Orange)
        gsap.fromTo(
          '#box4',
          { opacity: 0, y: -50, scale: 0.85 },
          {
            scrollTrigger: {
              trigger: container,
              start: 'top+=75% top',
              end: 'top+=95% top',
              scrub: 0.6,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        )
      }

      // Initial measurement after fonts load
      document.fonts.ready.then(() => {
        updateDimensionsAndAnimation()
      })

      window.addEventListener('resize', updateDimensionsAndAnimation)

      return () => {
        window.removeEventListener('resize', updateDimensionsAndAnimation)
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isAudioEnabled])

  // Stop audio on idle
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setSpeed((prev) => Math.max(0, prev * 0.9))
      if (gainRef.current && isAudioEnabled && audioContextRef.current) {
        gainRef.current.gain.setTargetAtTime(0.0001, audioContextRef.current.currentTime, 0.2)
      }
    }, 150)
    return () => clearTimeout(idleTimer)
  }, [speed, isAudioEnabled])

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#121212] select-none"
      style={{ height: '280vh' }} // Ample runway for smooth scroll scrub
    >
      {/* Sticky Pinned Stage (Always 100vh) */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-8"
      >
        {/* Background Grid & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[300px] bg-[#45db7d]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header / Context Area */}
        <div className="relative z-20 pt-16 md:pt-14 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#def54f] mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SCROLL-DRIVEN DYNAMICS</span>
            <span className="text-white/40">//</span>
            <span className="text-zinc-400">GSAP SCROLLTRIGGER</span>
          </div>
          <h2 className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            AERODYNAMIC TELEMETRY &bull; McLAREN 720S
          </h2>
        </div>

        {/* --- MAIN HIGHWAY TRACK (Centerfold) --- */}
        <div className="relative w-full my-auto z-20 flex items-center justify-center">
          {/* Outer Roadbed Container */}
          <div
            ref={roadRef}
            id="road"
            className="relative w-full h-[180px] sm:h-[220px] md:h-[240px] bg-[#1c1c1c] border-y border-white/10 shadow-2xl overflow-hidden flex items-center"
          >
            {/* Asphalt Texture */}
            <div className="absolute inset-0 asphalt-texture opacity-70 pointer-events-none" />

            {/* Road Lane Center Divider Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 road-divider pointer-events-none opacity-40" />

            {/* Tarmac Curb Edges (Top & Bottom kerbs) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-red-500 bg-[length:40px_100%] opacity-30" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-red-500 bg-[length:40px_100%] opacity-30" />

            {/* Glowing Emerald Trail behind Car */}
            <div
              ref={trailRef}
              id="trail"
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#45db7d]/10 via-[#45db7d]/50 to-[#45db7d] z-10 pointer-events-none transition-none shadow-glow-green"
              style={{
                width: 0,
                borderRight: '3px solid #ffffff',
                boxShadow: '0 0 35px #45db7d, inset 0 0 20px #45db7d',
              }}
            />

            {/* Letter-Spaced Grand Headline: "W E L C O M E   I T Z F I Z Z" */}
            <div
              ref={headlineContainerRef}
              className="relative z-20 w-full px-4 sm:px-8 md:px-12 flex items-center justify-center pointer-events-none"
            >
              <h1 className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-mono tracking-wider select-none">
                {HEADLINE_LETTERS.map((char, index) => {
                  if (char === ' ') {
                    return (
                      <span
                        key={index}
                        className="inline-block w-4 sm:w-8 md:w-12 lg:w-16"
                      >
                        &nbsp;
                      </span>
                    )
                  }
                  return (
                    <span
                      key={index}
                      ref={(el) => (lettersRef.current[index] = el)}
                      className="value-letter inline-block transition-transform duration-150 font-black will-change-transform"
                      style={{
                        color: '#71717a',
                        opacity: 0, // Animates on initial load + scroll
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </h1>
            </div>

            {/* Top-View McLaren 720S Car Image */}
            <div
              ref={carRef}
              id="car"
              className="absolute top-1/2 -translate-y-1/2 left-0 z-30 pointer-events-none will-change-transform"
              style={{
                height: '160px',
                width: 'auto',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))',
              }}
            >
              <img
                src="./car.png"
                alt="McLaren 720S Supercar"
                className="h-[130px] sm:h-[160px] md:h-[180px] w-auto max-w-none object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* --- 4 FLOATING IMPACT METRIC CARDS --- */}
        {/* Metric 1: 58% (Volt Lime) - Top Left/Center */}
        <MetricCard
          id="box1"
          cardRef={box1Ref}
          number="58"
          unit="%"
          title="Increase in pick up point use"
          subtext="Automated hub routing"
          bgColor="#def54f"
          textColor="#111"
          accentColor="#def54f"
          icon={TrendingUp}
          positionClasses="top-16 sm:top-20 md:top-24 right-4 sm:right-16 md:right-[28%] max-w-[260px]"
          isPositive={true}
        />

        {/* Metric 2: 23% (Electric Cyan) - Bottom Left/Center */}
        <MetricCard
          id="box2"
          cardRef={box2Ref}
          number="23"
          unit="%"
          title="Decreased in customer phone calls"
          subtext="Self-service tracking"
          bgColor="#6ac9ff"
          textColor="#111"
          accentColor="#6ac9ff"
          icon={PhoneCall}
          positionClasses="bottom-20 sm:bottom-24 md:bottom-28 right-6 sm:right-20 md:right-[34%] max-w-[260px]"
          isPositive={false}
        />

        {/* Metric 3: 27% (Slate Carbon) - Top Right */}
        <MetricCard
          id="box3"
          cardRef={box3Ref}
          number="27"
          unit="%"
          title="Surge in fulfillment throughput"
          subtext="Express lane validation"
          bgColor="#242424"
          textColor="#fff"
          accentColor="#ffffff"
          icon={Zap}
          positionClasses="top-16 sm:top-20 md:top-24 right-4 sm:right-8 md:right-[10%] max-w-[260px]"
          isPositive={true}
        />

        {/* Metric 4: 40% (Flame Orange) - Bottom Right */}
        <MetricCard
          id="box4"
          cardRef={box4Ref}
          number="40"
          unit="%"
          title="Drop in dispatch turnaround time"
          subtext="Zero friction handoff"
          bgColor="#fa7328"
          textColor="#111"
          accentColor="#fa7328"
          icon={Award}
          positionClasses="bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-10 md:right-[12%] max-w-[260px]"
          isPositive={false}
        />

        {/* Bottom Telemetry HUD */}
        <TelemetryHUD
          speed={speed}
          scrollProgress={scrollPct}
          gear={gear}
        />

        {/* Scroll cue hint on initial load */}
        {scrollPct < 5 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] font-mono text-zinc-500 animate-bounce pointer-events-none">
            <span>SCROLL DOWN TO DRIVE</span>
            <ChevronDown className="w-4 h-4 text-[#45db7d]" />
          </div>
        )}
      </div>
    </div>
  )
}
