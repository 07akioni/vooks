import { onBeforeMount, onBeforeUnmount, ref, Ref, readonly } from 'vue'
import { on, off } from './utils'

const clickedTimeRef = ref<number | undefined>(undefined)

let usedCount = 0
function handleClick (): void {
  clickedTimeRef.value = Date.now()
}

export default function useClicked (timeout: number): Readonly<Ref<boolean>> {
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
    on('click', window, handleClick)
  }
  onBeforeMount(() => {
    usedCount += 1
    on('click', window, clickedHandler)
  })
  onBeforeUnmount(() => {
    usedCount -= 1
    if (usedCount === 0) {
      off('click', window, handleClick)
    }
    off('click', window, clickedHandler)
    clearTimer()
  })
  return readonly(clickedRef)
}
