import { create } from 'zustand'

const initialMessages = [
  {
    id: 1,
    from: 'priya',
    to: 'learner',
    content: "Good morning! Welcome to Kiran Technologies. I'm Priya, your PM. Quick heads up — we have a production alert. Payment service is throwing 500s. Can you take a look at KT-118?",
    timestamp: '09:47',
    visible: false,
  },
  {
    id: 2,
    from: 'rajan',
    to: 'learner',
    content: "Hey, saw the alert too. I've been looking at the logs — looks like it started around 09:39. The checkout endpoint is timing out. We need to figure out if it's the DB or the upstream payment gateway. What's your initial read?",
    timestamp: '09:48',
    visible: false,
  },
  {
    id: 3,
    from: 'kiran',
    to: 'learner',
    content: "I pulled KT-118. The last deployment was yesterday at 18:22. Could be related? I don't have prod access to check logs directly. Rajan, can you share the relevant log lines?",
    timestamp: '09:49',
    visible: false,
  },
  {
    id: 4,
    from: 'priya',
    to: 'learner',
    content: "The client is starting to ask questions. TechCorp's CTO is online. I need a status update I can share externally in the next 10 minutes. Even a 'we're investigating' with an ETA helps.",
    timestamp: '09:51',
    visible: false,
  },
]

export const useSimulationStore = create((set, get) => ({
  messages: initialMessages,
  activeCharacter: 'priya',
  elapsedSeconds: 0,
  simulationMode: 'running',
  alertVisible: true,
  unreadCounts: {
    priya: 2,
    rajan: 1,
    kiran: 1,
    client: 0,
  },
  isTyping: false,
  typingCharacter: null,

  setActiveCharacter: (character) =>
    set((state) => ({
      activeCharacter: character,
      unreadCounts: { ...state.unreadCounts, [character]: 0 },
    })),

  sendMessage: (content) => {
    const state = get()
    const now = new Date()
    const hours = String(9 + Math.floor(state.elapsedSeconds / 3600)).padStart(2, '0')
    const minutes = String(47 + Math.floor((state.elapsedSeconds % 3600) / 60)).padStart(2, '0')
    const timestamp = `${hours}:${minutes}`

    const newMessage = {
      id: Date.now(),
      from: 'learner',
      to: state.activeCharacter,
      content,
      timestamp,
      visible: true,
    }

    set((state) => ({
      messages: [...state.messages, newMessage],
      isTyping: true,
      typingCharacter: state.activeCharacter,
    }))

    // Simulate response after 2-3 seconds
    const delay = 2000 + Math.random() * 1000
    setTimeout(() => {
      const responses = {
        priya: [
          "Got it, thanks for the update. I'll relay this to TechCorp. Keep me posted every 5 minutes.",
          "Understood. Can you give me a rough ETA so I can manage expectations on my end?",
          "Good thinking. Let's loop in Rajan on this too — he has context on the payment service.",
        ],
        rajan: [
          "I see what you mean. Let me check the DB connection pool — been flaky since last week's infra update.",
          "Good point. I'll run a quick test on staging to verify. Give me 4 minutes.",
          "Agreed. The logs show a cascade — upstream gateway is responding slow. Not a code issue on our end.",
        ],
        kiran: [
          "On it! I'll set up a monitoring alert so we catch this earlier next time.",
          "Makes sense. I'll document this in the incident report. What severity should I tag it as?",
          "Got it. Should I update the ticket status to 'In Progress' and add you as the assignee?",
        ],
        client: [
          "We need this fixed in the next 15 minutes or we escalate to your VP of Engineering.",
          "What's the root cause? Our customers are seeing errors. This is unacceptable.",
          "Thank you for the update. Please confirm once fully resolved with a post-mortem.",
        ],
      }

      const charResponses = responses[get().activeCharacter] || responses.priya
      const responseContent = charResponses[Math.floor(Math.random() * charResponses.length)]
      const respMsg = {
        id: Date.now() + 1,
        from: get().activeCharacter,
        to: 'learner',
        content: responseContent,
        timestamp,
        visible: true,
      }

      set((state) => ({
        messages: [...state.messages, respMsg],
        isTyping: false,
        typingCharacter: null,
      }))
    }, delay)
  },

  revealMessage: (id) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, visible: true } : m)),
    })),

  tickClock: () => set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),

  dismissAlert: () => set({ alertVisible: false }),

  endSimulation: () => set({ simulationMode: 'ended' }),

  addUnread: (character) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [character]: (state.unreadCounts[character] || 0) + 1,
      },
    })),
}))
