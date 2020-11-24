import { computed, ref, Ref, watch, ComputedRef } from 'vue'

function useMemo<T> (valueGenerator: () => T): ComputedRef<T> {
  const computedValueRef = computed(valueGenerator)
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  return valueRef as ComputedRef<T>
}

export default useMemo
