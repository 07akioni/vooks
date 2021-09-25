import { onMounted, onBeforeUnmount } from 'vue'
import { isBrowser } from './utils'

let fontsReady: Promise<void> | undefined
let isFontReady: boolean

const init = (): void => {
  fontsReady = isBrowser ? (document as any)?.fonts?.ready : undefined
  isFontReady = false
  /* istanbul ignore if */
  if (fontsReady !== undefined) {
    void fontsReady.then(() => {
      isFontReady = true
    })
  } else {
    isFontReady = true
  }
}

init()

// For testing
export { init }

/**
 * Call callback on fontsReady is resolved. If fontsReady is already resolved,
 * callback won't be called.
 */
export default function onFontsReady (cb: () => any): void {
  /* istanbul ignore next */
  if (isFontReady) return
  let deactivated = false
  onMounted(() => {
    /* istanbul ignore next */
    if (!isFontReady) {
      fontsReady?.then(() => {
        if (deactivated) return
        cb()
      })
    }
  })
  onBeforeUnmount(() => {
    deactivated = true
  })
}
