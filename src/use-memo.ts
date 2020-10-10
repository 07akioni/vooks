import { computed, ref, readonly, Ref, watch, DeepReadonly } from 'vue'

function useMemo<T> (valueGenerator: () => T): DeepReadonly<Ref<T>> {
  const computedValueRef = computed(valueGenerator)
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  return readonly(valueRef)
}

export default useMemo
