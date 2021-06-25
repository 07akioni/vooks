import { onBeforeMount, onBeforeUnmount, ref, Ref, readonly } from 'vue'
import { on, off } from 'evtd'
import { hasInstance, isBrowser } from './utils'

const clickedTimeRef = ref<number | undefined>(undefined)

let usedCount = 0
function handleClick (): void {
  clickedTimeRef.value = Date.now()
}

let managable = true

export default function useClicked (timeout: number): Readonly<Ref<boolean>> {
  if (!isBrowser) return readonly(ref(false))
  const clickedRef = ref(false)
  let timerId: number | null = null
  function clearTimer (): void {
    if (timerId !== null) window.clearTimeout(timerId)
  }
  function clickedHandler (): void {
    clearTimer()
    clickedRef.value = true
    timerId = window.setTimeout(() => {
      clickedRef.value = false
    }, timeout)
  }
  if (usedCount === 0) {
    on('click', window, handleClick, true)
  }
  const setup = (): void => {
    usedCount += 1
    on('click', window, clickedHandler, true)
  }
  if (managable && (managable = hasInstance())) {
    onBeforeMount(setup)
    onBeforeUnmount(() => {
      usedCount -= 1
      if (usedCount === 0) {
        off('click', window, handleClick, true)
      }
      off('click', window, clickedHandler, true)
      clearTimer()
    })
  } else {
    setup()
  }
  return readonly(clickedRef)
}
