import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getCurrentVisitId, saveLoveSession, trackChoice } from '../lib/tracker'

const SCENES = [
  {
    id: 'entry',
    line: 'Hey...\nI built this little world quietly...\njust in case you ever felt like walking through it with me.',
    cta: 'Take My Hand',
  },
  {
    id: 'garden',
    line: 'If someone cared about you in silence...\nhow would you want them to show it?',
    options: [
      { label: 'Write something meaningful', score: 3 },
      { label: 'Do small thoughtful things', score: 2 },
      { label: 'Protect me silently', score: 3 },
      { label: "I don't believe in silent love", score: 0 },
    ],
  },
  {
    id: 'moon',
    line: 'If that person looked at you a little longer than usual...',
    options: [
      { label: 'I would notice', score: 2 },
      { label: 'I would smile', score: 3 },
      { label: 'I would pretend not to notice', score: 1 },
      { label: 'I would feel shy', score: 2 },
    ],
  },
  {
    id: 'confession',
    line: 'If they told you...\nyou mean more than you think...',
    options: [
      { label: 'I would feel safe', score: 3 },
      { label: 'I would blush', score: 3 },
      { label: 'I would need time', score: 1 },
      { label: 'I would be confused', score: 0 },
    ],
  },
]

const scoreMessage = (score) => {
  if (score >= 7) {
    return 'I think...\nsomeone here feels more than they say.\nAnd maybe...\nthat someone is closer than you think.'
  }
  if (score >= 4) {
    return 'There is something here.\nSoft.\nGrowing.\nQuietly beautiful.'
  }
  return 'Some feelings bloom slowly.\nBut even slow flowers are beautiful.'
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const glowWords = ['quietly', 'beautiful', 'closer', 'safe', 'bloom']

const CinematicButton = ({ children, className = '', onClick, disabled = false }) => {
  const [ripple, setRipple] = useState(null)
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setRipple({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          id: Date.now(),
        })
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-white/20 px-4 py-3 text-sm font-semibold text-pink-50 shadow-[0_10px_26px_rgba(19,10,36,0.36)] backdrop-blur-xl transition duration-500 hover:shadow-[0_14px_36px_rgba(255,164,231,0.35)] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.55)_48%,transparent_78%)] opacity-70 [animation:shimmerSlide_5s_linear_infinite]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] border border-pink-200/30 [animation:borderGlow_3.2s_ease-in-out_infinite]" />
      <span className="relative z-10">{children}</span>
      {ripple ? (
        <span
          key={ripple.id}
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 [animation:rippleWave_650ms_ease-out_forwards]"
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() => setRipple(null)}
        />
      ) : null}
    </motion.button>
  )
}

const TeddyGuide = ({ onTap, revealWhisper }) => {
  const [blink, setBlink] = useState(false)
  const [bounce, setBounce] = useState(false)
  const [showFallbackSvg, setShowFallbackSvg] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 180)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.button
      type="button"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={() => {
        setBounce(true)
        setTimeout(() => setBounce(false), 260)
        onTap()
      }}
      animate={{
        y: [0, -12, 0],
        scale: bounce ? 1.05 : [1, 1.02, 1],
      }}
      transition={{
        y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 3.2, repeat: bounce ? 0 : Infinity, ease: 'easeInOut' },
      }}
      className="relative z-[84] h-[170px] w-[145px] rounded-full drop-shadow-[0_0_24px_rgba(255,155,220,0.65)] focus:outline-none sm:h-[190px] sm:w-[165px]"
    >
      {!showFallbackSvg ? (
        <img
          src="/projectimages/teddy.webp"
          alt="Teddy guide"
          className="h-full w-full object-contain drop-shadow-[0_18px_34px_rgba(26,12,40,0.52)]"
          onError={() => setShowFallbackSvg(true)}
        />
      ) : (
        <svg viewBox="0 0 220 255" className="h-full w-full drop-shadow-[0_20px_36px_rgba(20,8,28,0.55)]">
          <defs>
            <radialGradient id="furMain" cx="35%" cy="25%" r="78%">
              <stop offset="0%" stopColor="#f7d6ba" />
              <stop offset="62%" stopColor="#ddb08a" />
              <stop offset="100%" stopColor="#b98763" />
            </radialGradient>
            <radialGradient id="furSoft" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffe2c8" />
              <stop offset="100%" stopColor="#c5926d" />
            </radialGradient>
            <radialGradient id="earInner" cx="45%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ffd6c8" />
              <stop offset="100%" stopColor="#e9ab95" />
            </radialGradient>
          </defs>

          <ellipse cx="110" cy="234" rx="56" ry="16" fill="rgba(0,0,0,0.26)" />
          <ellipse cx="74" cy="62" rx="28" ry="26" fill="url(#furMain)" />
          <ellipse cx="146" cy="62" rx="28" ry="26" fill="url(#furMain)" />
          <ellipse cx="74" cy="64" rx="14" ry="13" fill="url(#earInner)" />
          <ellipse cx="146" cy="64" rx="14" ry="13" fill="url(#earInner)" />

          <ellipse cx="110" cy="95" rx="62" ry="57" fill="url(#furMain)" />
          <ellipse cx="110" cy="176" rx="54" ry="60" fill="url(#furSoft)" />
          <ellipse cx="110" cy="114" rx="32" ry="26" fill="#f4c5a4" />

          <ellipse cx="88" cy="98" rx="7" ry={blink ? 1.4 : 7} fill="#2f1f1b" />
          <ellipse cx="132" cy="98" rx="7" ry={blink ? 1.4 : 7} fill="#2f1f1b" />
          <ellipse cx="110" cy="110" rx="10" ry="8" fill="#402820" />
          <path d="M94 120 Q110 136 126 120" stroke="#4b2e24" strokeWidth="5" fill="none" strokeLinecap="round" />

          <ellipse cx="62" cy="166" rx="24" ry="20" fill="url(#furMain)" />
          <ellipse cx="158" cy="166" rx="24" ry="20" fill="url(#furMain)" />
          <ellipse cx="84" cy="216" rx="21" ry="15" fill="url(#furMain)" />
          <ellipse cx="136" cy="216" rx="21" ry="15" fill="url(#furMain)" />

          <ellipse cx="110" cy="164" rx="19" ry="16" fill="#f0b9d2" opacity="0.92" />
          <path d="M110 151 l5 9 10 1 -8 7 2 10 -9 -5 -9 5 2 -10 -8 -7 10 -1z" fill="#ffdff0" stroke="#f0b9d2" strokeWidth="1.2" />
        </svg>
      )}
      {!showFallbackSvg ? (
        <span
          className={`pointer-events-none absolute left-[31%] top-[33%] h-[6px] w-[6px] rounded-full bg-[#3f2a25]/80 transition-all duration-150 ${
            blink ? 'scale-y-[0.18]' : ''
          }`}
        />
      ) : null}
      {!showFallbackSvg ? (
        <span
          className={`pointer-events-none absolute left-[59%] top-[33%] h-[6px] w-[6px] rounded-full bg-[#3f2a25]/80 transition-all duration-150 ${
            blink ? 'scale-y-[0.18]' : ''
          }`}
        />
      ) : null}
      <AnimatePresence>
        {revealWhisper ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -right-8 -top-3 w-44 rounded-2xl border border-white/35 bg-white/25 px-3 py-2 text-left text-[11px] font-semibold text-pink-50 backdrop-blur-xl"
          >
            He really cares about you more than you know...
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

const SecretGardenPhase = ({ onComplete, onBack }) => {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [typingStep, setTypingStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [spark, setSpark] = useState(false)
  const [teddyTapCount, setTeddyTapCount] = useState(0)
  const [finalMessage, setFinalMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fadeToBlack, setFadeToBlack] = useState(false)
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 })

  const current = sceneIndex < SCENES.length ? SCENES[sceneIndex] : null
  const atReveal = sceneIndex >= SCENES.length
  const progress = Math.min(100, Math.round((sceneIndex / SCENES.length) * 100))

  const hearts = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        left: 8 + ((i * 11.3) % 82),
        size: 24 + (i % 4) * 11,
        duration: 14 + (i % 5) * 2.3,
        delay: (i % 4) * 0.9,
      })),
    [],
  )

  const particles = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        left: (i * 7.7) % 100,
        top: (i * 13.4) % 100,
        size: 1 + (i % 3),
        delay: (i % 7) * 0.45,
        duration: 5 + (i % 6) * 1.1,
      })),
    [],
  )

  const currentText = useMemo(() => {
    if (atReveal) return scoreMessage(score)
    return current?.line || ''
  }, [atReveal, current?.line, score])

  const goBackInGarden = () => {
    if (sceneIndex > 0) {
      setSceneIndex((prev) => Math.max(0, prev - 1))
      return
    }
    if (onBack) onBack()
  }

  useEffect(() => {
    setTypingStep(0)
    if (!currentText) return
    if (sceneIndex !== 0) return
    const timer = setInterval(() => {
      setTypingStep((count) => {
        if (count >= currentText.length) {
          clearInterval(timer)
          return count
        }
        return count + 1
      })
    }, 28)
    return () => clearInterval(timer)
  }, [currentText, sceneIndex])

  const goNextScene = async (nextIndex) => {
    setFadeToBlack(true)
    await pause(400)
    setSceneIndex(nextIndex)
    await pause(30)
    setFadeToBlack(false)
  }

  const onSelect = async (option) => {
    if (!current?.options) return
    setAnswers((prev) => ({ ...prev, [current.id]: option.label }))
    setScore((prev) => prev + option.score)
    setSpark(true)
    setTimeout(() => setSpark(false), 560)
    trackChoice({
      phase: 'phase6.1',
      question: current.line,
      choice: option.label,
      extra: { scene: current.id, score: option.score },
    })
    await goNextScene(sceneIndex + 1)
  }

  const saveAndContinue = async () => {
    setSaving(true)
    await saveLoveSession({
      visitId: getCurrentVisitId(),
      answers,
      score,
      finalMessage: finalMessage.trim(),
    })
    setSaving(false)
    setSaved(true)
    await goNextScene(sceneIndex)
    if (onComplete) onComplete()
  }

  const highlightedLines = currentText.split('\n')

  return (
    <div
      className="absolute inset-0 z-[88] overflow-hidden"
      onPointerDown={(event) => {
        event.stopPropagation()
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        const midpoint = rect.left + rect.width / 2
        if (event.clientX < midpoint) {
          goBackInGarden()
        }
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        setMouseTilt({ x, y })
      }}
      onPointerLeave={() => setMouseTilt({ x: 0, y: 0 })}
    >
      <style>{`
        @keyframes heartRise { 0% { transform: translateY(20px) scale(0.9); opacity: 0; } 20% { opacity: 0.45; } 100% { transform: translateY(-110vh) scale(1.08); opacity: 0; } }
        @keyframes particleFloat { 0%,100% { transform: translateY(0px); opacity: 0.25; } 50% { transform: translateY(-10px); opacity: 0.68; } }
        @keyframes shimmerSlide { 0% { transform: translateX(-120%); } 100% { transform: translateX(130%); } }
        @keyframes rippleWave { 0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(28); } }
        @keyframes borderGlow { 0%,100% { opacity: 0.28; box-shadow: 0 0 0 rgba(255,195,236,0.0); } 50% { opacity: 0.64; box-shadow: 0 0 34px rgba(255,171,226,0.36); } }
        @keyframes heartbeatPulse { 0%,100% { opacity: 0.08; } 45% { opacity: 0.15; } 55% { opacity: 0.2; } }
      `}</style>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(130deg,#17132f_0%,#2a1e49_32%,#47265f_62%,#24113e_100%)]"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{ backgroundSize: '180% 180%' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ transform: `translate(${mouseTilt.x * -16}px, ${mouseTilt.y * -12}px)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,171,224,0.42),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(163,154,255,0.34),transparent_32%),radial-gradient(circle_at_52%_88%,rgba(120,221,255,0.2),transparent_30%)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-38"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(120deg, rgba(201,150,255,0.0) 0%, rgba(201,150,255,0.18) 40%, rgba(255,173,231,0.0) 75%)' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[-18%] top-[6%] z-[66] h-[32vh] w-[136%] rotate-[-10deg] bg-[linear-gradient(90deg,rgba(80,255,196,0)_0%,rgba(80,255,196,0.26)_18%,rgba(104,255,238,0.3)_33%,rgba(149,230,255,0.2)_48%,rgba(205,176,255,0.26)_68%,rgba(205,176,255,0)_92%)] blur-[22px]"
        animate={{ x: ['-8%', '8%', '-8%'], opacity: [0.35, 0.72, 0.35], scaleY: [0.95, 1.06, 0.95] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[-24%] top-[14%] z-[65] h-[28vh] w-[145%] rotate-[8deg] bg-[linear-gradient(90deg,rgba(101,255,219,0)_0%,rgba(101,255,219,0.23)_20%,rgba(142,239,255,0.26)_40%,rgba(197,156,255,0.26)_58%,rgba(255,166,223,0.24)_72%,rgba(255,166,223,0)_100%)] blur-[28px]"
        animate={{ x: ['7%', '-7%', '7%'], opacity: [0.24, 0.58, 0.24], scaleY: [0.92, 1.08, 0.92] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[-12%] top-[20%] z-[64] h-[18vh] w-[122%] rotate-[-4deg] bg-[linear-gradient(90deg,rgba(155,255,241,0)_0%,rgba(155,255,241,0.16)_22%,rgba(178,215,255,0.22)_42%,rgba(220,184,255,0.17)_64%,rgba(220,184,255,0)_92%)] blur-[18px]"
        animate={{ x: ['-6%', '5%', '-6%'], opacity: [0.12, 0.34, 0.12] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="pointer-events-none absolute inset-0 [animation:heartbeatPulse_2.8s_ease-in-out_infinite] bg-[radial-gradient(60%_42%_at_50%_64%,rgba(255,170,230,0.22),rgba(255,170,230,0)_72%)]" />

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="pointer-events-none absolute bottom-[-12%] text-pink-200/22 blur-[0.5px]"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `heartRise ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="pointer-events-none absolute rounded-full bg-white/70"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `particleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            boxShadow: '0 0 14px rgba(255, 255, 255, 0.52)',
          }}
        />
      ))}

      <div className="pointer-events-none absolute right-[8%] top-[6%] z-[70] h-[88px] w-[88px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff9de_0%,#ffe8b8_32%,#f6d48f_62%,#d2a86c_100%)] shadow-[0_0_55px_rgba(255,227,162,0.72)] sm:h-[116px] sm:w-[116px]">
        <span className="absolute left-[24%] top-[28%] h-2.5 w-2.5 rounded-full bg-[#d6b788]/65 sm:h-3 sm:w-3" />
        <span className="absolute left-[50%] top-[45%] h-2 w-2 rounded-full bg-[#cba77a]/65 sm:h-2.5 sm:w-2.5" />
        <span className="absolute left-[37%] top-[62%] h-1.5 w-1.5 rounded-full bg-[#c99f71]/65 sm:h-2 sm:w-2" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[68]">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={`sky-star-${i}`}
            className="absolute rounded-full bg-white/90"
            style={{
              left: `${(i * 17.9) % 100}%`,
              top: `${(i * 11.7) % 42}%`,
              width: `${1 + (i % 2)}px`,
              height: `${1 + (i % 2)}px`,
              boxShadow: '0 0 10px rgba(255,255,255,0.7)',
              animation: `particleFloat ${4.5 + (i % 5)}s ease-in-out ${(i % 6) * 0.4}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[72] h-[24%] bg-[linear-gradient(180deg,rgba(4,4,7,0)_0%,rgba(3,3,6,0.88)_38%,#020204_100%)]" />
      <div className="pointer-events-none absolute inset-x-[-4%] bottom-[12%] z-[73] h-[15%] bg-[#020205]" style={{ clipPath: 'polygon(0% 100%, 4% 76%, 10% 84%, 17% 66%, 25% 82%, 33% 60%, 41% 78%, 50% 56%, 59% 80%, 67% 62%, 75% 82%, 84% 64%, 91% 80%, 100% 70%, 100% 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-[74] h-[20%]">
        {Array.from({ length: 17 }).map((_, i) => (
          <span
            key={`tree-${i}`}
            className="absolute bottom-0 bg-[#010103]"
            style={{
              left: `${i * 6.2}%`,
              width: `${18 + (i % 4) * 6}px`,
              height: `${50 + (i % 5) * 16}px`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-[max(12px,calc(env(safe-area-inset-top)+10px))] z-[90] w-[min(92vw,760px)] -translate-x-1/2">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-pink-100/88">Our Journey</p>
        <div className="h-2.5 overflow-hidden rounded-full border border-white/35 bg-white/18 backdrop-blur-xl">
          <motion.div
            className="h-full bg-[linear-gradient(90deg,#ffb7dc,#d7b8ff,#9dd0ff)] shadow-[0_0_16px_rgba(255,183,220,0.6)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-[18%] z-[89] flex justify-center sm:top-[19%]">
        <TeddyGuide onTap={() => setTeddyTapCount((v) => v + 1)} revealWhisper={teddyTapCount >= 5} />
      </div>

      <div className="absolute bottom-[max(84px,calc(env(safe-area-inset-bottom)+62px))] left-1/2 z-[92] w-[min(94vw,760px)] -translate-x-1/2 px-2 sm:bottom-8">
        <motion.div
          key={sceneIndex}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.45rem] border border-white/35 bg-white/18 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:px-6"
        >
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] border border-pink-200/35 [animation:borderGlow_3.2s_ease-in-out_infinite]" />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_50%,rgba(255,223,243,0.15))]" />

          <div className="pointer-events-none absolute right-3 top-3">
            <div className="relative h-12 w-12 rounded-full bg-[radial-gradient(circle,#fff8d6_18%,#ffe9aa_45%,rgba(255,233,170,0.2)_72%)] shadow-[0_0_22px_rgba(255,238,182,0.6)]">
              <span className="absolute left-[-9px] top-[-5px] h-1 w-1 rounded-full bg-white/80" />
              <span className="absolute left-[10px] top-[-10px] h-1 w-1 rounded-full bg-white/70" />
              <span className="absolute left-[27px] top-[-8px] h-1 w-1 rounded-full bg-white/75" />
            </div>
          </div>

          {sceneIndex === 0 ? (
            <p
              className="whitespace-pre-line text-center text-[1.05rem] font-semibold leading-[1.35] text-pink-50 sm:text-[1.55rem]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
            >
              {currentText.slice(0, typingStep)}
              <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-pink-100/90 align-middle" />
            </p>
          ) : (
            <div className="space-y-1.5">
              {highlightedLines.map((line, lineIndex) => (
                <motion.p
                  key={`${sceneIndex}-${lineIndex}-${line}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: lineIndex * 0.09, ease: 'easeOut' }}
                  className="whitespace-pre-line text-center text-[1.04rem] font-semibold leading-[1.35] text-pink-50 sm:text-[1.45rem]"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                >
                  {line.split(' ').map((word, index) => {
                    const clean = word.toLowerCase().replace(/[^a-z]/g, '')
                    const glow = glowWords.includes(clean)
                    return (
                      <span key={`${word}-${index}`} className={glow ? 'text-pink-100 [text-shadow:0_0_12px_rgba(255,184,232,0.85)] [animation:heartbeatPulse_2.6s_ease-in-out_infinite]' : ''}>
                        {word}{' '}
                      </span>
                    )
                  })}
                </motion.p>
              ))}
            </div>
          )}

          {!atReveal && current?.id === 'entry' ? (
            <div className="mt-4 flex justify-center">
              <CinematicButton onClick={() => goNextScene(1)} className="px-6 py-2.5 text-sm text-[#4d1f4f] bg-[linear-gradient(110deg,#ffc6e2,#e6c7ff,#b8dbff)]">
                {current.cta}
              </CinematicButton>
            </div>
          ) : null}

          {!atReveal && current?.options ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {current.options.map((option) => (
                <CinematicButton key={option.label} onClick={() => onSelect(option)} className="text-left">
                  {option.label}
                </CinematicButton>
              ))}
            </div>
          ) : null}

          {atReveal ? (
            <div className="mt-4 space-y-3">
              <p className="text-center text-sm font-semibold text-pink-100">Write something for me...</p>
              <textarea
                value={finalMessage}
                onChange={(event) => setFinalMessage(event.target.value)}
                placeholder="Type your heart here..."
                className="h-24 w-full resize-none rounded-xl border border-white/35 bg-white/12 px-3 py-2 text-sm text-pink-50 placeholder:text-pink-100/60 outline-none transition duration-500 focus:border-pink-200/70 focus:ring-2 focus:ring-pink-200/35"
              />
              <div className="flex gap-2">
                <CinematicButton onClick={saveAndContinue} disabled={saving} className="flex-1 text-[#4d1f4f] bg-[linear-gradient(110deg,#ffc6e2,#e6c7ff,#b8dbff)]">
                  {saving ? 'Saving...' : saved ? 'Saved' : 'Submit and Continue'}
                </CinematicButton>
                <CinematicButton
                  onClick={() => {
                    setSceneIndex(0)
                    setAnswers({})
                    setScore(0)
                    setFinalMessage('')
                    setSaved(false)
                    setTeddyTapCount(0)
                    trackChoice({ phase: 'phase6.1', question: 'Secret Garden', choice: 'Replay' })
                  }}
                >
                  Replay
                </CinematicButton>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      <AnimatePresence>
        {spark ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-[93]">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-lg text-pink-200/85"
                initial={{ x: '50vw', y: '55vh', opacity: 1, scale: 0.6 }}
                animate={{ x: `${50 + (Math.random() * 42 - 21)}vw`, y: `${55 + (Math.random() * 36 - 18)}vh`, opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                ✦
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {fadeToBlack ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 z-[97] bg-black"
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default SecretGardenPhase
