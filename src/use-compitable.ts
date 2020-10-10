import { computed, ComputedRef } from 'vue'

type GetArrayElementType<T extends any[]> = T extends Array<infer U> ? U : never

export default function useCompitable<T extends object, V extends keyof T> (
  reactive: T,
  keys: V[]
): ComputedRef<T[GetArrayElementType<V[]>]> {
  return computed(() => {
    for (const key of keys) {
      if (reactive[key] !== undefined) return reactive[key]
    }
    return reactive[keys[keys.length - 1]]
  })
}
