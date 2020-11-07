import { onMounted, onBeforeUnmount } from 'vue'

export default function onFontsReady (cb: () => any): void {
  let deactivated = false
  onMounted(() => {
    const fontsReady = (document as any)?.fonts?.ready
    if (fontsReady !== undefined) {
      fontsReady.then(() => {
        if (deactivated) return
        cb()
      })
    }
  })
  onBeforeUnmount(() => { deactivated = true })
}
