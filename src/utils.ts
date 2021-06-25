import { getCurrentInstance } from 'vue'

export function hasInstance (): boolean {
  return getCurrentInstance() !== null
}

export const isBrowser = typeof window !== 'undefined'
