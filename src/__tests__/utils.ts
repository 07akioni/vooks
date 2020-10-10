import {
  createApp,
  Component
} from 'vue'

interface Wrapper {
  unmount: () => void
}

export function mount (comp: Component, options?: object): Wrapper {
  const div = document.createElement('div')
  const app = createApp({
    render () {
      return null
    },
    ...comp
  })
  app.mount(div)
  return {
    unmount: () => app.unmount(div)
  }
}
