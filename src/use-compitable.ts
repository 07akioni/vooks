import { computed, ComputedRef } from 'vue'

// TODO: figure out type
export default function useCompitable<T, V extends { [key: string]: any }> (reactive: V, keys: string[]): ComputedRef<T> {
  return computed(() => {
    for (const key of keys) {
      if (reactive[key] !== undefined) return reactive[key]
    }
  }) as ComputedRef<T>
}
