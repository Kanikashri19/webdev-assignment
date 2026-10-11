import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LETTERS = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
]

export default function HeroSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const valueAddRef = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const road = roadRef.current
    const car = carRef.current
    const trail = trailRef.current
    const valueAdd = valueAddRef.current
    const letters = lettersRef.current.filter(Boolean)

    if (!section || !track || !road || !car || !trail || !valueAdd) return

    const getCarWidth = () => {
      if (car.offsetWidth && car.offsetWidth > 100) {
        return car.offsetWidth
      }
      return Math.round(200 * (917 / 388)) // ~473px (Ferrari LaFerrari aspect ratio)
    }

    const initAnimation = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())

      const roadWidth = road.offsetWidth || window.innerWidth
      const carWidth = getCarWidth()

      // Allow car to travel across the road so the entire text is revealed
      const endX = roadWidth - Math.round(carWidth * 0.3)

      // Calculate letter offsets locally inside the road container
      const letterOffsets = letters.map((letter) => {
        return valueAdd.offsetLeft + letter.offsetLeft
      })

      // Initial trail position
      gsap.set(trail, { width: carWidth * 0.45 })

      // Unified Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // ZERO lag 1:1 scroll sync
          pin: track,
          anticipatePin: 1,
          onUpdate: () => {
            const currentX = gsap.getProperty(car, 'x')
            const carCenter = currentX + carWidth * 0.5

            // Trail follows car with zero lag
            gsap.set(trail, { width: carCenter })

            // Letters light up as soon as car reaches them
            letters.forEach((letter, i) => {
              if (letterOffsets[i] !== undefined && carCenter >= letterOffsets[i]) {
                letter.style.opacity = '1'
                letter.style.color = '#ffffff'
              } else {
                letter.style.opacity = '0.15'
                letter.style.color = '#555555'
              }
            })
          },
        },
      })

      // Car travel
      tl.to(
        car,
        {
          x: endX,
          ease: 'none',
        },
        0
      )

      // PAIR 1: Box 1 (Top) and Box 2 (Bottom) pop at 24% scroll progress
      tl.fromTo(
        '#box1',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, ease: 'power1.out', duration: 0.1 },
        0.24
      )
      tl.fromTo(
        '#box2',
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, ease: 'power1.out', duration: 0.1 },
        0.24
      )

      // PAIR 2: Box 3 (Top) and Box 4 (Bottom) pop at 52% scroll progress (before end)
      tl.fromTo(
        '#box3',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, ease: 'power1.out', duration: 0.1 },
        0.52
      )
      tl.fromTo(
        '#box4',
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, ease: 'power1.out', duration: 0.1 },
        0.52
      )
    }

    if (car.complete) {
      initAnimation()
    } else {
      car.onload = initAnimation
    }

    const handleResize = () => {
      initAnimation()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="hero-section relative w-full"
      style={{ height: '240vh' }}
    >
      {/* Sticky Pinned Track */}
      <div
        ref={trackRef}
        className="track relative top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: '#d1d1d1',
          willChange: 'transform',
        }}
      >
        {/* Road Track */}
        <div
          ref={roadRef}
          id="road"
          className="road relative w-full h-[200px] flex items-center overflow-hidden"
          style={{ backgroundColor: '#1e1e1e' }}
        >
          {/* Top-View Ferrari Car */}
          <img
            ref={carRef}
            src="./car.png"
            alt="Ferrari Car"
            id="car"
            className="car absolute top-0 left-0 h-[200px] z-10 pointer-events-none select-none"
            style={{
              width: 'auto',
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />

          {/* Trail Behind Car */}
          <div
            ref={trailRef}
            id="trail"
            className="trail absolute top-0 left-0 h-[200px] z-[1] pointer-events-none"
            style={{
              backgroundColor: '#2563eb',
              width: 0,
              willChange: 'width',
            }}
          />

          {/* Letter-Spaced Headline */}
          <div
            ref={valueAddRef}
            className="value-add absolute top-1/2 -translate-y-1/2 left-[5%] flex items-center z-[5] pointer-events-none select-none"
          >
            <h1 className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-sans tracking-widest">
              {HEADLINE_LETTERS.map((char, index) => {
                if (char === ' ') {
                  return (
                    <span key={index} className="inline-block w-3 sm:w-6 md:w-8 lg:w-10">
                      &nbsp;
                    </span>
                  )
                }
                return (
                  <span
                    key={index}
                    ref={(el) => (lettersRef.current[index] = el)}
                    className="value-letter inline-block font-black transition-colors duration-75"
                    style={{
                      color: '#555555',
                      opacity: 0.15,
                    }}
                  >
                    {char}
                  </span>
                )
              })}
            </h1>
          </div>
        </div>

        {/* --- 4 Impact Statistic Cards: 2 and 2 Parallel in Pairs --- */}

        {/* PAIR 1 (COLUMN 1: right: 32%) */}
        {/* Box 1 (Top Left) */}
        <div
          id="box1"
          className="text-box absolute z-[5] rounded-xl flex flex-col justify-center items-start shadow-md pointer-events-none w-[240px] sm:w-[260px]"
          style={{
            top: '7%',
            right: '32%',
            backgroundColor: '#def54f',
            color: '#111',
            padding: '24px 28px',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-4xl sm:text-5xl font-bold font-sans leading-none">58%</span>
          <span className="text-xs sm:text-sm font-medium mt-1">Increase in pick up point use</span>
        </div>

        {/* Box 2 (Bottom Left - Vertically parallel to Box 1) */}
        <div
          id="box2"
          className="text-box absolute z-[5] rounded-xl flex flex-col justify-center items-start shadow-md pointer-events-none w-[240px] sm:w-[260px]"
          style={{
            bottom: '7%',
            right: '32%',
            backgroundColor: '#6ac9ff',
            color: '#111',
            padding: '24px 28px',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-4xl sm:text-5xl font-bold font-sans leading-none">23%</span>
          <span className="text-xs sm:text-sm font-medium mt-1">Decreased in customer phone calls</span>
        </div>

        {/* PAIR 2 (COLUMN 2: right: 8%) */}
        {/* Box 3 (Top Right) */}
        <div
          id="box3"
          className="text-box absolute z-[5] rounded-xl flex flex-col justify-center items-start shadow-md pointer-events-none w-[240px] sm:w-[260px]"
          style={{
            top: '7%',
            right: '8%',
            backgroundColor: '#333333',
            color: '#ffffff',
            padding: '24px 28px',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-4xl sm:text-5xl font-bold font-sans leading-none">27%</span>
          <span className="text-xs sm:text-sm font-medium mt-1">Increase in pick up point use</span>
        </div>

        {/* Box 4 (Bottom Right - Vertically parallel to Box 3) */}
        <div
          id="box4"
          className="text-box absolute z-[5] rounded-xl flex flex-col justify-center items-start shadow-md pointer-events-none w-[240px] sm:w-[260px]"
          style={{
            bottom: '7%',
            right: '8%',
            backgroundColor: '#fa7328',
            color: '#111',
            padding: '24px 28px',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-4xl sm:text-5xl font-bold font-sans leading-none">40%</span>
          <span className="text-xs sm:text-sm font-medium mt-1">Decreased in customer phone calls</span>
        </div>
      </div>
    </div>
  )
}
