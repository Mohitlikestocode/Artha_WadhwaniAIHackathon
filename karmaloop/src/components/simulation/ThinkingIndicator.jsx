import { motion } from 'framer-motion'

const characterColors = {
  priya: '#6366F1',
  rajan: '#F59E0B',
  kiran: '#10B981',
  client: '#EF4444',
}

const characterNames = {
  priya: 'Priya Mehta',
  rajan: 'Rajan Krishnamurthy',
  kiran: 'Kiran Patel',
  client: 'TechCorp Client',
}

function ThinkingIndicator({ character }) {
  const color = characterColors[character] || '#6366F1'
  const name = characterNames[character] || character

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-3 px-4 py-2"
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>

      {/* Bubble with dots */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: '#64748B' }}>
          {name}
        </span>
        <div
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
          style={{ background: '#1E1E1E', border: '1px solid #1E293B' }}
        >
          <span
            className="w-2 h-2 rounded-full dot-1"
            style={{ backgroundColor: color }}
          />
          <span
            className="w-2 h-2 rounded-full dot-2"
            style={{ backgroundColor: color }}
          />
          <span
            className="w-2 h-2 rounded-full dot-3"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ThinkingIndicator
