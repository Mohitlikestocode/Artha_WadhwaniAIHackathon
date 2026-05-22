import { jargonLibrary } from './jargonLibrary'
import JargonTooltip from './JargonTooltip'

const JARGON_TERMS = Object.keys(jargonLibrary)

export function processMessageForJargon(text) {
  if (!text || typeof text !== 'string') return text

  // Build regex that matches any jargon term (case-insensitive, word boundaries)
  const sortedTerms = [...JARGON_TERMS].sort((a, b) => b.length - a.length)
  const escapedTerms = sortedTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi')

  const parts = []
  let lastIndex = 0
  let match

  const regex = new RegExp(pattern.source, 'gi')
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const termKey = match[0].toLowerCase()
    // Find the actual library key
    const libKey = JARGON_TERMS.find(k => k.toLowerCase() === termKey) || termKey
    parts.push(
      <JargonTooltip key={`${match.index}-${match[0]}`} term={libKey}>
        {match[0]}
      </JargonTooltip>
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
