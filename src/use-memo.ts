import { computed, ref, readonly, Ref, watch, DeepReadonly } from 'vue'

type UseMemo = <T>(valueGenerator: () => T) => DeepReadonly<Ref<T>>

// TODO: fix type
const useMemo: UseMemo = function <T> (valueGenerator: () => T) {
  const computedValueRef = computed(valueGenerator)
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  return readonly(valueRef)
}

export default useMemo
