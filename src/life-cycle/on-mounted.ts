import {
  ComponentPublicInstance,
  getCurrentInstance,
  onMounted as vueOnMounted
} from 'vue'

export default function onMounted (cb: (vm: ComponentPublicInstance) => any): void {
  vueOnMounted(() => {
    const instance = getCurrentInstance()
    cb((instance as any).proxy)
  })
}
