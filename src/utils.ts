import { getCurrentInstance } from 'vue'

export function hasInstance (): boolean {
  return getCurrentInstance() !== null
}
