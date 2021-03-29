import { computed, ref, Ref, watch, ComputedRef, WritableComputedRef } from 'vue'

type MemoGetter<T> = () => T
type MemoSetter<T> = (v: T) => void

interface WritableMemoOptions<T> {
  get: MemoGetter<T>
  set: MemoSetter<T>
}

function useMemo<T> (getter: MemoGetter<T>): ComputedRef<T>
function useMemo<T> (options: WritableMemoOptions<T>): WritableComputedRef<T>
function useMemo<T> (getterOrOptions: MemoGetter<T> | WritableMemoOptions<T>): ComputedRef<T> {
  const computedValueRef = computed(getterOrOptions as MemoGetter<T>)
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  return valueRef as ComputedRef<T>
}

export default useMemo
