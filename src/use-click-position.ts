import { Ref, ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue'
import { on, off } from './utils'

interface MousePosition { x: number, y: number }

const mousePositionRef = ref<MousePosition | null>(null)

function clickHandler (e: MouseEvent): void {
  mousePositionRef.value = {
    x: e.clientX,
    y: e.clientY
  }
}

let usedCount = 0

export default function useClickPosition (): Readonly<Ref<MousePosition | null>> {
  if (usedCount === 0) on('click', window, clickHandler as any, true)
  onBeforeMount(() => { usedCount += 1 })
  onBeforeUnmount(() => {
    usedCount -= 1
    if (usedCount === 0) off('click', window, clickHandler as any, true)
  })
  return readonly(mousePositionRef)
}
