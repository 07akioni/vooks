import { onMounted, onBeforeUnmount } from 'vue'

const fontsReady = (document as any)?.fonts?.ready
let isFontReady = false

if (fontsReady !== undefined) {
  fontsReady.then(() => {
    isFontReady = true
  })
}

export default function onFontsReady (cb: () => any): void {
  if (isFontReady) return
  let deactivated = false
  onMounted(() => {
    if (fontsReady !== undefined && !isFontReady) {
      fontsReady.then(() => {
        if (deactivated) return
        cb()
      })
    }
  })
  onBeforeUnmount(() => { deactivated = true })
}
