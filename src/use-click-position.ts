import { Ref, ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue'
import { on, off } from 'evtd'
import { hasInstance, isBrowser } from './utils'

interface MousePosition {
  x: number
  y: number
}

const mousePositionRef = ref<MousePosition | null>(null)

function clickHandler (e: MouseEvent): void {
  if (e.isTrusted) {
    mousePositionRef.value = {
      x: e.clientX,
      y: e.clientY
    }
  } else {
    const { target } = e
    if (target instanceof HTMLElement) {
      const { left, top, width, height } = target.getBoundingClientRect()
      mousePositionRef.value = {
        x: left + width / 2,
        y: top + height / 2
      }
    } else {
      mousePositionRef.value = null
    }
  }
}

let usedCount = 0

let managable = true

export default function useClickPosition (): Readonly<
Ref<MousePosition | null>
> {
  if (!isBrowser) return readonly(ref(null))
  if (usedCount === 0) on('click', document, clickHandler as any, true)
  const setup = (): void => {
    usedCount += 1
  }
  if (managable && (managable = hasInstance())) {
    onBeforeMount(setup)
    onBeforeUnmount(() => {
      usedCount -= 1
      if (usedCount === 0) off('click', document, clickHandler as any, true)
    })
  } else {
    setup()
  }
  return readonly(mousePositionRef)
}
