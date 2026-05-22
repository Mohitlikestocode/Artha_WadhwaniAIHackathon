import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { jargonLibrary } from './jargonLibrary'

const categoryColors = {
  technical: '#6366F1',
  workplace: '#10B981',
  business: '#F59E0B',
  process: '#8B5CF6',
}

const categoryLabels = {
  technical: 'Technical',
  workplace: 'Workplace',
  business: 'Business',
  process: 'Process',
}

function JargonTooltip({ term, children }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState('top')
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)

  const data = jargonLibrary[term] || jargonLibrary[term?.toLowerCase?.()]
  if (!data) return <span>{children || term}</span>

  const color = categoryColors[data.category] || '#6366F1'
  const label = categoryLabels[data.category] || 'General'

  const handleToggle = (e) => {
    e.stopPropagation()
    setOpen((prev) => !prev)

    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setPosition(spaceBelow < 200 ? 'top' : 'bottom')
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        onClick={handleToggle}
        className={`jargon-${data.category} cursor-pointer inline`}
        style={{ borderBottom: `1.5px dashed ${color}` }}
      >
        {children || term}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: position === 'bottom' ? -8 : 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'bottom' ? -8 : 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-72 rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: '#1E1E1E',
              border: `1px solid ${color}40`,
              bottom: position === 'top' ? 'calc(100% + 8px)' : 'auto',
              top: position === 'bottom' ? 'calc(100% + 8px)' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-4 py-2 flex items-center justify-between"
              style={{ background: `${color}15`, borderBottom: `1px solid ${color}30` }}
            >
              <span
                className="text-xs font-mono font-medium uppercase tracking-widest"
                style={{ color }}
              >
                {label}
              </span>
              <span className="text-xs font-mono text-[#64748B]">{data.term}</span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-[#F8FAFC] leading-relaxed font-inter">
                {data.definition}
              </p>

              {data.example && (
                <div
                  className="rounded-lg px-3 py-2"
                  style={{ background: '#242424', borderLeft: `3px solid ${color}` }}
                >
                  <p className="text-xs text-[#94A3B8] italic leading-relaxed font-inter">
                    {data.example}
                  </p>
                </div>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full text-sm font-medium py-2 rounded-lg transition-all duration-150 active:scale-95"
                style={{
                  background: `${color}20`,
                  color,
                  border: `1px solid ${color}40`,
                }}
              >
                Got it ✓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

// Helper to parse text and wrap jargon terms
export function JargonText({ text }) {
  const terms = Object.keys(jargonLibrary)

  // Build a regex that matches any jargon term (case-insensitive)
  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi')

  const parts = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const matchedTerm = match[0]
    const key = Object.keys(jargonLibrary).find(
      (k) => k.toLowerCase() === matchedTerm.toLowerCase()
    )
    parts.push(
      <JargonTooltip key={`${match.index}-${matchedTerm}`} term={key || matchedTerm} />
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <span>{parts}</span>
}

export default JargonTooltip
