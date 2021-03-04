import {
  createApp,
  Component,
  App,
  ComponentPublicInstance
} from 'vue'

interface Wrapper {
  app: App
  instance: ComponentPublicInstance
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
  const instance = app.mount(div)
  return {
    app,
    instance,
    unmount: () => app.unmount()
  }
}
