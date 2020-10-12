import { defineComponent } from 'vue'
import { useOsTheme } from '../index'
import { mount } from './utils'

describe('# useOsTheme', () => {
  let matchMedia: any
  beforeEach(() => {
    matchMedia = window.matchMedia as any
  })
  afterEach(() => {
    window.matchMedia = matchMedia
  })
  it('return null if not support os theme', () => {
    window.matchMedia = undefined
    mount(
      defineComponent({
        setup () {
          return {
            theme: useOsTheme()
          }
        },
        mounted () {
          expect(this.theme).toEqual(null)
        }
      })
    )
  })
  it('works', () => {
    let triggerDark: Function
    let triggerLight: Function
    (window.matchMedia as any) = (query: string) => {
      return {
        matches: false,
        addEventListener (type, handler: Function) {
          if (query.includes('light')) {
            triggerLight = handler
          }
          if (query.includes('dark')) {
            triggerDark = handler
          }
        },
        removeEventListener () {}
      }
    }
    const wrapper = mount(
      defineComponent({
        setup () {
          return {
            theme: useOsTheme()
          }
        },
        mounted () {
          expect(this.theme).toEqual(null)
          triggerDark({ matches: true })
          expect(this.theme).toEqual('dark')
          triggerLight({ matches: true })
          expect(this.theme).toEqual('light')
        }
      })
    )
    wrapper.unmount()
  })
})
