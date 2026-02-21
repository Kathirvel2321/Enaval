import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { trackChoice } from '../lib/tracker'

const SUNRISE_DIALOGUES = [
  'View pakka semaya eruke la...',
  'Evlo tha phone laptop la ye time spend panna...',
  'Ena tha phone laptop erunthalum idhu mari varuma?',
  'Onu theriyuma...',
  'Nanga rendu perum nalla pesuvom, palaguvom, elam nalla pogum.',
  'Apo than sudden ah oru pause...',
  'Pesurathu apadeye stop.',
  'Ava pesa matta.',
  'Pesunalum reply panna maata.',
  'Rendu perum sanda poduvom, ana ethuke podurom ne engalukke theriyathu.',
  'Sometimes one week, sometimes two week.',
  'Athu yen naanga.. masam kanakka la sanda potturukom.',
  'Ana naanga thanala pesikuvom. We just connect with each other again.',
  'Romba happy ah pona spicy irukathu la relation la...',
  'Ava vandhu kadal mathiri.',
  'Kadal alatha kuda therinjikalam...',
  'Ana ava manasula ena iruku nu therinjika mudiyathu.',
  'Athu than Kaushi.',
  'Kaushi Kaushi than.',
  'Wait...',
  'Kaushi...',
  'Kaushi illa... ava Kaushalya.',
  '3 years pinadi suthuren... ava peru kuda enaku theriyama pochu.',
  'Umai ya erukerevangala kuda pesa vaitheralam... ana nama alaa pesa vaika mudiyathu.',
  'Ava nenaicha matum than pesuva.',
  'Ava ena pannalum enoda kannuku...',
  'Oru chinna kulantha sedaipanura mathiri than irukum.',
  'Ana sometimes ava pesura words apadiye nerupu alli vesura mathiri varum.',
  'She will tell whatever in her mind without any hesitation.',
  'Ava hurt panuva than ena...',
  'Ana ava ena heal than romba paniruka.',
  'Epo la romba low va feel panuveno, apom la ethavuthu chinna pilla thanama pani sirika vachiduva.',
  'Ava enoda chella kiruki.',
  'Yen endral ena ava thana kiruka aakuva.',
  'Kadhal kirukan haa.',
]

const getSceneImage = (index) => {
  if (index === 6) return '/projectimages/naa.webp'
  if (index >= 7 && index <= 9) return '/projectimages/naa.webp'
  if (index >= 33) return '/projectimages/hi3.webp'
  if (index >= 30) return '/projectimages/hi1.webp'
  if (index >= 27) return '/projectimages/naa.webp' // mnaa image not available; using naa
  if (index >= 26) return '/projectimages/hi3.webp'
  if (index >= 24) return '/projectimages/hi1.webp'
  if (index >= 22) return '/projectimages/naa.webp'
  if (index >= 19) return '/projectimages/shocked.webp'
  if (index >= 14) return '/projectimages/hismile.webp'
  if (index >= 5) return '/projectimages/hi4.webp'
  if (index >= 3) return '/projectimages/hi5.webp'
  return '/projectimages/hi.webp'
}

const PhaseSixTwoSunrise = ({ onBack, onComplete }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [typedCount, setTypedCount] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const activeDialogue = SUNRISE_DIALOGUES[dialogueIndex]
  const activeImage = useMemo(() => getSceneImage(dialogueIndex), [dialogueIndex])
  const grassBack = useMemo(
    () =>
      Array.from({ length: 180 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: 24 + Math.random() * 62,
        w: 1 + Math.random() * 1.2,
        h: 18 + Math.random() * 20,
        rot: (Math.random() * 14 - 7).toFixed(2),
        opacity: 0.14 + Math.random() * 0.16,
        sway: 3 + Math.random() * 2,
        delay: Math.random() * 1.8,
        tone: ['#5f8651', '#658b55', '#6b925a'][i % 3],
      })),
    [],
  )
  const grassMid = useMemo(
    () =>
      Array.from({ length: 250 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: 10 + Math.random() * 62,
        w: 1.2 + Math.random() * 1.6,
        h: 20 + Math.random() * 28,
        rot: (Math.random() * 16 - 8).toFixed(2),
        opacity: 0.2 + Math.random() * 0.22,
        sway: 3 + Math.random() * 2,
        delay: Math.random() * 2.2,
        tone: ['#4e7f44', '#55884a', '#5e9150', '#689b58'][i % 4],
      })),
    [],
  )
  const grassFront = useMemo(
    () =>
      Array.from({ length: 220 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: 0 + Math.random() * 28,
        w: 1.5 + Math.random() * 1.8,
        h: 28 + Math.random() * 35,
        rot: (Math.random() * 18 - 9).toFixed(2),
        opacity: 0.24 + Math.random() * 0.28,
        sway: 3 + Math.random() * 2,
        delay: Math.random() * 2.6,
        tone: ['#3f6c39', '#44723d', '#4b7a42'][i % 3],
      })),
    [],
  )
  const meadowFlowers = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        x: 4 + Math.random() * 92,
        y: 9 + Math.random() * 46,
        size: 2 + Math.random() * 5,
        rot: Math.random() * 360,
        delay: Math.random() * 2,
        sway: 2 + Math.random() * 2.3,
        color: ['#ffd8e8', '#fff2b7', '#e4d2ff', '#ffffff'][i % 4],
      })),
    [],
  )
  const backPetals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: 8 + Math.random() * 84,
        y: 54 + Math.random() * 22,
        drift: 10 + Math.random() * 20,
        rise: 16 + Math.random() * 18,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 4,
        size: 4 + Math.random() * 3,
      })),
    [],
  )
  const frontPetals = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: 6 + Math.random() * 88,
        y: 62 + Math.random() * 22,
        drift: 12 + Math.random() * 24,
        rise: 18 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: 6.5 + Math.random() * 3.5,
        size: 6 + Math.random() * 4,
      })),
    [],
  )

  useEffect(() => {
    setTypedCount(0)
    const timer = setInterval(() => {
      setTypedCount((count) => {
        if (count >= activeDialogue.length) {
          clearInterval(timer)
          return count
        }
        return count + 1
      })
    }, 34)

    trackChoice({
      phase: 'phase6.2',
      question: 'Scene Enter',
      choice: 'Sunrise Terrace Started',
    })
    return () => clearInterval(timer)
  }, [activeDialogue])

  const forward = async () => {
    if (dialogueIndex < SUNRISE_DIALOGUES.length - 1) {
      setDialogueIndex((current) => current + 1)
      return
    }
    setFadeOut(true)
    trackChoice({
      phase: 'phase6.2',
      question: 'Scene Exit',
      choice: 'Continue to Phase 7',
    })
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 520)
  }

  const backward = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex((current) => current - 1)
      return
    }
    trackChoice({
      phase: 'phase6.2',
      question: 'Scene Exit',
      choice: 'Back to Phase 6.1',
    })
    if (onBack) onBack()
  }

  return (
    <div
      className="absolute inset-0 z-[89] overflow-hidden"
      onPointerDown={(event) => {
        event.stopPropagation()
        if (fadeOut) return
        const rect = event.currentTarget.getBoundingClientRect()
        const mid = rect.left + rect.width / 2
        if (event.clientX < mid) backward()
        else forward()
      }}
    >
      <style>{`
        @keyframes cloudFloat { 0% { transform: translateX(-8%);} 100% { transform: translateX(8%);} }
        @keyframes cloudFloatSlow { 0% { transform: translateX(-4%);} 100% { transform: translateX(5%);} }
        @keyframes birdFly { 0% { transform: translateX(-20vw) translateY(0px) scale(0.9);} 100% { transform: translateX(120vw) translateY(-12px) scale(1.05);} }
        @keyframes birdFlap { 0%,100% { transform: scaleY(1) rotate(0deg);} 50% { transform: scaleY(0.76) rotate(3deg);} }
        @keyframes hazeDrift { 0% { transform: translateX(-6%);} 100% { transform: translateX(6%);} }
        @keyframes grassSway { 0%,100% { transform: rotate(var(--rot)); } 50% { transform: rotate(calc(var(--rot) + 1.8deg)); } }
        @keyframes flowerSway { 0%,100% { transform: rotate(var(--frot)); } 50% { transform: rotate(calc(var(--frot) + 4deg)); } }
      `}</style>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#1f2b58_0%,#4e4a7f_20%,#e68664_52%,#f7c58f_74%,#a7d9a3_100%)]"
        animate={{ backgroundPosition: ['50% 0%', '50% 12%', '50% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ backgroundSize: '100% 130%' }}
      />

      <div className="pointer-events-none absolute left-1/2 top-[23%] z-[62] h-[18vh] w-[18vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,201,0.96)_0%,rgba(255,212,118,0.9)_42%,rgba(255,178,82,0.42)_68%,rgba(255,178,82,0)_100%)] blur-[1px]" />

      <motion.div
        className="pointer-events-none absolute left-[-20%] top-[10%] z-[63] h-[15vh] w-[54vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.42)_48%,rgba(255,255,255,0)_100%)] blur-[7px]"
        style={{ animation: 'cloudFloat 22s ease-in-out infinite alternate' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[2%] top-[8%] z-[63] h-[10vh] w-[28vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_52%,rgba(255,255,255,0)_100%)] blur-[7px]"
        style={{ animation: 'cloudFloatSlow 19s ease-in-out infinite alternate' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-16%] top-[17%] z-[63] h-[13vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_100%)] blur-[7px]"
        style={{ animation: 'cloudFloatSlow 25s ease-in-out infinite alternate-reverse' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[15%] top-[22%] z-[63] h-[10vh] w-[36vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0)_100%)] blur-[6px]"
        style={{ animation: 'cloudFloat 18s ease-in-out infinite alternate-reverse' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[6%] top-[12%] z-[63] h-[9vh] w-[26vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.26)_50%,rgba(255,255,255,0)_100%)] blur-[6px]"
        style={{ animation: 'cloudFloat 21s ease-in-out infinite alternate' }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[43%] z-[64] h-[21%] bg-[#5f6b70]" style={{ clipPath: 'polygon(0% 100%, 8% 64%, 17% 79%, 27% 50%, 36% 72%, 47% 41%, 57% 66%, 68% 43%, 79% 70%, 89% 52%, 100% 66%, 100% 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-[39%] z-[65] h-[18%] bg-[#4d585c]" style={{ clipPath: 'polygon(0% 100%, 11% 70%, 22% 83%, 33% 58%, 45% 78%, 58% 52%, 70% 73%, 83% 56%, 100% 72%, 100% 100%)' }} />

      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-[-4%] bottom-0 z-[71] h-[44%]"
      >
        <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[linear-gradient(180deg,#7aa267_0%,#5e874f_38%,#46673d_100%)] shadow-[0_-18px_34px_rgba(18,28,16,0.34)]" />
        <div className="absolute inset-x-[-2%] bottom-[18%] h-[56%] bg-[linear-gradient(180deg,rgba(189,218,142,0.26)_0%,rgba(145,189,108,0.18)_42%,rgba(108,152,85,0.02)_100%)]" />
        <div className="absolute inset-y-0 right-[-4%] w-[34%] bg-[radial-gradient(ellipse_at_center,rgba(255,212,140,0.18)_0%,rgba(255,212,140,0)_68%)]" />
        <div className="absolute inset-x-[-8%] bottom-[24%] z-[72] h-[20%] bg-gradient-to-t from-white/18 to-transparent blur-[6px]" />

        <div className="absolute inset-x-[1%] bottom-[2%] z-[73] h-[88%] overflow-hidden rounded-[1rem]">
          {grassBack.map((blade) => (
            <span
              key={`gb-${blade.id}`}
              className="absolute origin-bottom rounded-t-sm blur-[0.8px]"
              style={{
                left: `${blade.left}%`,
                bottom: `${blade.bottom}%`,
                width: `${blade.w}px`,
                height: `${blade.h}px`,
                opacity: blade.opacity,
                background: `linear-gradient(180deg, ${blade.tone}b8 0%, ${blade.tone}08 100%)`,
                '--rot': `${blade.rot}deg`,
                animation: `grassSway ${blade.sway}s ease-in-out ${blade.delay}s infinite`,
              }}
            />
          ))}

          {grassMid.map((blade) => (
            <span
              key={`gm-${blade.id}`}
              className="absolute origin-bottom rounded-t-sm"
              style={{
                left: `${blade.left}%`,
                bottom: `${blade.bottom}%`,
                width: `${blade.w}px`,
                height: `${blade.h}px`,
                opacity: blade.opacity,
                background: `linear-gradient(180deg, ${blade.tone}cf 0%, ${blade.tone}0f 100%)`,
                '--rot': `${blade.rot}deg`,
                animation: `grassSway ${blade.sway}s ease-in-out ${blade.delay}s infinite`,
              }}
            />
          ))}

          {meadowFlowers.map((flower) => (
            <span
              key={`flower-meadow-${flower.id}`}
              className="absolute rounded-full"
              style={{
                left: `${flower.x}%`,
                bottom: `${flower.y}%`,
                width: `${flower.size}px`,
                height: `${flower.size}px`,
                backgroundColor: flower.color,
                boxShadow: '0 0 6px rgba(255,255,255,0.48)',
                '--frot': `${flower.rot}deg`,
                animation: `flowerSway ${flower.sway}s ease-in-out ${flower.delay}s infinite`,
              }}
            />
          ))}

          {grassFront.map((blade) => (
            <span
              key={`gf-${blade.id}`}
              className="absolute origin-bottom rounded-t-sm"
              style={{
                left: `${blade.left}%`,
                bottom: `${blade.bottom}%`,
                width: `${blade.w}px`,
                height: `${blade.h}px`,
                opacity: blade.opacity,
                background: `linear-gradient(180deg, ${blade.tone}e8 0%, ${blade.tone}18 100%)`,
                '--rot': `${blade.rot}deg`,
                animation: `grassSway ${blade.sway}s ease-in-out ${blade.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage}
          src={activeImage}
          alt=""
          initial={{ opacity: 0, y: 16, scale: 0.97, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(5px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-[26%] left-1/2 z-[74] w-[min(48vw,330px)] -translate-x-1/2 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.38)]"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-[69]">
        {[0, 1, 2].map((flock) => (
          <motion.svg
            key={`flock-${flock}`}
            viewBox="0 0 220 90"
            className="absolute left-[-30vw] h-[44px] w-[180px] text-emerald-950/90"
            style={{ top: `${20 + flock * 7}%`, animation: `birdFly ${12 + flock * 2}s linear ${flock * 1.5}s infinite` }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 14 + i * 20
              const wingOffset = 4 - Math.abs(4 - i)
              const y = 28 + wingOffset * 4
              return (
                <motion.path
                  key={`bird-shape-${flock}-${i}`}
                  d={`M ${x - 6} ${y} Q ${x} ${y - 5} ${x + 6} ${y}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  animate={{ d: [`M ${x - 6} ${y} Q ${x} ${y - 5} ${x + 6} ${y}`, `M ${x - 6} ${y + 1} Q ${x} ${y - 2} ${x + 6} ${y + 1}`, `M ${x - 6} ${y} Q ${x} ${y - 5} ${x + 6} ${y}`] }}
                  transition={{ duration: 0.7 + (i % 3) * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              )
            })}
          </motion.svg>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[73]">
        {backPetals.map((petal) => (
          <motion.span
            key={`petal-back-${petal.id}`}
            className="absolute block h-[7px] w-[7px] rounded-full"
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              backgroundColor: ['#ffd8e8', '#fff2b7', '#e4d2ff', '#ffffff'][petal.id % 4],
              boxShadow: '0 0 4px rgba(255,255,255,0.3)',
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, petal.drift * 0.5, petal.drift],
              y: [0, -petal.rise * 0.6, -petal.rise],
              rotate: [0, 100, 220],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[76]">
        {frontPetals.map((petal) => (
          <motion.span
            key={`petal-front-${petal.id}`}
            className="absolute block rounded-full"
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              backgroundColor: ['#ffd8e8', '#fff2b7', '#e4d2ff', '#ffffff'][petal.id % 4],
              boxShadow: '0 0 8px rgba(255,255,255,0.35)',
              filter: 'blur(1px)',
            }}
            animate={{
              x: [0, petal.drift * 0.45, petal.drift],
              y: [0, -petal.rise * 0.55, -petal.rise],
              rotate: [0, 110, 260],
              opacity: [0, 0.78, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[max(86px,calc(env(safe-area-inset-bottom)+62px))] left-1/2 z-[90] w-[min(94vw,760px)] -translate-x-1/2 px-2 sm:bottom-8">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.4rem] border border-white/55 bg-white/24 px-4 py-4 shadow-[0_14px_34px_rgba(30,22,30,0.24)] backdrop-blur-xl sm:px-6"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.0)_18%,rgba(255,255,255,0.45)_40%,rgba(255,255,255,0.0)_62%)] opacity-70 [animation:hazeDrift_8s_ease-in-out_infinite]" />
          <p className="relative whitespace-pre-line text-center text-[1.03rem] font-semibold leading-[1.35] text-[#4e1f2f] sm:text-[1.55rem]" style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
            {activeDialogue.slice(0, typedCount)}
            <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-[#4e1f2f]/80 align-middle" />
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {fadeOut ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 z-[98] bg-black"
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default PhaseSixTwoSunrise
