import { Ref, ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue'
import { clickD } from './utils'

interface MousePosition { x: number, y: number }

const mousePositionRef = ref<MousePosition>()

function clickHandler (e: MouseEvent): void {
  mousePositionRef.value = {
    x: e.clientX,
    y: e.clientY
  }
}

let usedCount = 0

export default function useClickPosition (): Readonly<Ref<MousePosition | undefined>> {
  if (usedCount === 0) clickD.add(window, clickHandler)
  onBeforeMount(() => { usedCount += 1 })
  onBeforeUnmount(() => {
    usedCount -= 1
    if (usedCount === 0) clickD.remove(window, clickHandler)
  })
  return readonly(mousePositionRef)
}
