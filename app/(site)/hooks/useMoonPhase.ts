// For making a custom hook with react query to call moon data once, and share as cache across app
// hooks/useMoonPhase.ts
import { useQuery } from '@tanstack/react-query'
import { calculateBgColor, getMoonPhaseForWidget } from '@/app/(site)/utils/moon-utils'
import type { BgTheme } from '@/app/(site)/utils/moon-utils'

interface MoonPhaseData {
  theme: BgTheme
  phase: { name: string; img: string }
}

// Function to get moon phase data (wrapped for React Query)
const getMoonPhaseData = (): MoonPhaseData => {
  const theme = calculateBgColor() // Uses current date by default
  const phase = getMoonPhaseForWidget()

  return { theme, phase }
}

// Custom hook to get moon phase data with caching
export const useMoonPhase = () => {
  return useQuery({
    queryKey: ['moonPhase', new Date().toDateString()], // Cache key includes date so it updates daily
    queryFn: getMoonPhaseData,
    staleTime: 1000 * 60 * 60 * 12, // 12 hours - data stays fresh for half a day
    gcTime: 1000 * 60 * 60 * 24, // 24 hours - cache cleanup time
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  })
}

// Prefetch function to call on app initialization
export const prefetchMoonPhase = (queryClient: any) => {
  return queryClient.prefetchQuery({
    queryKey: ['moonPhase', new Date().toDateString()],
    queryFn: getMoonPhaseData,
    staleTime: 1000 * 60 * 60 * 12,
  })
}
