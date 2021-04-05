import { computed, ref, Ref, watch, ComputedRef, WritableComputedRef } from 'vue'

type MemoGetter<T> = () => T
type MemoSetter<T> = (v: T) => void

interface WritableMemoOptions<T> {
  get: MemoGetter<T>
  set: MemoSetter<T>
}

function useMemo<T> (getter: MemoGetter<T>): ComputedRef<T>
function useMemo<T> (options: WritableMemoOptions<T>): WritableComputedRef<T>
function useMemo<T> (getterOrOptions: MemoGetter<T> | WritableMemoOptions<T>): ComputedRef<T> | WritableComputedRef<T> {
  const computedValueRef = computed(getterOrOptions as MemoGetter<T>)
  // Maybe it's not possible to lazy evaluate the value, since we can't make
  // render phase capture the deps behind useMemo
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  if (typeof getterOrOptions === 'function') {
    return valueRef as ComputedRef<T>
  } else {
    return new Proxy({}, {
      get (_, key) {
        if (key === '__v_isRef') return true
        if (key === 'value') return valueRef.value
        return undefined
      },
      set (_, key, v: T) {
        if (key === 'value') {
          getterOrOptions.set(v)
        }
        return true
      }
    }) as WritableComputedRef<T>
  }
}

export default useMemo
