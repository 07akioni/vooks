import { getCurrentInstance, onMounted, ComponentPublicInstance, onBeforeUnmount } from 'vue'

export default function onFontsReady (cb: (vm: ComponentPublicInstance) => any): void {
  let deactivated = false
  onMounted(() => {
    const fontsReady = (document as any).fonts.ready
    const instance = (getCurrentInstance() as any).proxy
    fontsReady.then(() => {
      if (deactivated) return
      cb(instance)
    })
  })
  onBeforeUnmount(() => { deactivated = true })
}
