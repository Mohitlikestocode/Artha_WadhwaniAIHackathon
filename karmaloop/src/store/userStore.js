import { create } from 'zustand'

export const useUserStore = create((set) => ({
  name: '',
  track: null,
  background: null,
  experience: 0,
  selfAssessment: {
    technical: 3,
    communication: 3,
    workplace: 3,
  },
  language: 'English',
  onboardingStep: 1,

  setName: (name) => set({ name }),
  setTrack: (track) => set({ track }),
  setBackground: (background) => set({ background }),
  setExperience: (experience) => set({ experience }),
  setSelfAssessment: (key, value) =>
    set((state) => ({
      selfAssessment: { ...state.selfAssessment, [key]: value },
    })),
  setLanguage: (language) => set({ language }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  nextStep: () => set((state) => ({ onboardingStep: state.onboardingStep + 1 })),
  prevStep: () => set((state) => ({ onboardingStep: Math.max(1, state.onboardingStep - 1) })),
}))
