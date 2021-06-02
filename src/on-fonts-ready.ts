import { onMounted, onBeforeUnmount } from 'vue'

const fontsReady =
  typeof window === 'undefined' ? undefined : (document as any)?.fonts?.ready
let isFontReady = false

/* istanbul ignore if */
if (fontsReady !== undefined) {
  fontsReady.then(() => {
    isFontReady = true
  })
} else {
  isFontReady = true
}

/**
 * Call callback on fontsReady is resolved. If fontsReady is already resolved,
 * callback won't be called.
 */
export default function onFontsReady (cb: () => any): void {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test' && isFontReady) return
  if (
    process.env.NODE_ENV === 'test' &&
    // dynamic resolving here, since in we may change it in test environment
    (document as any)?.fonts?.ready === undefined
  ) { return }

  let deactivated = false
  onMounted(() => {
    /* istanbul ignore next */
    if (!isFontReady) {
      fontsReady.then(() => {
        if (deactivated) return
        cb()
      })
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      ;(document as any)?.fonts?.ready.then(() => {
        if (deactivated) return
        cb()
      })
    }
  })
  onBeforeUnmount(() => {
    deactivated = true
  })
}
