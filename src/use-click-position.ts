import { Ref, ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue'
import { on, off } from 'evtd'
import { hasInstance, isBrowser } from './utils'

interface MousePosition {
  x: number
  y: number
}

const mousePositionRef = ref<MousePosition | null>(null)

function clickHandler (e: MouseEvent): void {
  mousePositionRef.value = {
    x: e.clientX,
    y: e.clientY
  }
}

let usedCount = 0

let managable = true

export default function useClickPosition (): Readonly<
Ref<MousePosition | null>
> {
  if (!isBrowser) return readonly(ref(null))
  if (usedCount === 0) on('click', window, clickHandler as any, true)
  const setup = (): void => {
    usedCount += 1
  }
  if (managable && (managable = hasInstance())) {
    onBeforeMount(setup)
    onBeforeUnmount(() => {
      usedCount -= 1
      if (usedCount === 0) off('click', window, clickHandler as any, true)
    })
  } else {
    setup()
  }
  return readonly(mousePositionRef)
}
