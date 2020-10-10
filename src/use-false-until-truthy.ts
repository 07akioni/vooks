import { ref, readonly, watch, Ref } from 'vue'

export default function useFalseUntilTruthy (originalRef: Ref<any>): Readonly<Ref<boolean>> {
  const currentRef = ref(!!(originalRef.value as boolean))
  if (currentRef.value) return readonly(currentRef)
  const stop = watch(originalRef, (value: any) => {
    if (value as boolean) {
      currentRef.value = true
      stop()
    }
  })
  return readonly(currentRef)
}
