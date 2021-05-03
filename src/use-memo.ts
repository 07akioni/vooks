import {
  computed,
  ref,
  Ref,
  watch,
  ComputedRef,
  WritableComputedRef
} from 'vue'

type MemoGetter<T> = () => T
type MemoSetter<T> = (v: T) => void

interface WritableMemoOptions<T> {
  get: MemoGetter<T>
  set: MemoSetter<T>
}

function useMemo<T> (getter: MemoGetter<T>): ComputedRef<T>
function useMemo<T> (options: WritableMemoOptions<T>): WritableComputedRef<T>
function useMemo<T> (
  getterOrOptions: MemoGetter<T> | WritableMemoOptions<T>
): ComputedRef<T> | WritableComputedRef<T> {
  const computedValueRef = computed(getterOrOptions as any) as
    | WritableComputedRef<T>
    | ComputedRef<T>
  // Maybe it's not possible to lazy evaluate the value, since we can't make
  // render phase capture the deps behind useMemo
  const valueRef = ref(computedValueRef.value) as Ref<T>
  watch(computedValueRef, (value) => {
    valueRef.value = value
  })
  if (typeof getterOrOptions === 'function') {
    return valueRef as ComputedRef<T>
  } else {
    return ({
      __v_isRef: true,
      get value () {
        return valueRef.value
      },
      set value (v: T) {
        (getterOrOptions as WritableMemoOptions<T>).set(v)
      }
    } as unknown) as WritableComputedRef<T>
  }
}

export default useMemo
