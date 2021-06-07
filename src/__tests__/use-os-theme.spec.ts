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
    (window as any).matchMedia = undefined
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
  ;['light', 'dark'].forEach(theme => {
    it('has init theme ' + theme, () => {
      (window.matchMedia as any) = (query: string) => {
        return {
          matches: query.includes(theme),
          addEventListener () {},
          removeEventListener () {}
        }
      }
      const comp = defineComponent({
        setup () {
          return {
            theme: useOsTheme()
          }
        },
        created () {
          expect(this.theme).toEqual(theme)
        }
      })
      const wrapper = mount(comp)
      const wrapper1 = mount(comp)
      wrapper.unmount()
      wrapper1.unmount() // for cov
    })
  })
  it('works', () => {
    let triggerDark: Function
    let triggerLight: Function
    (window.matchMedia as any) = (query: string) => {
      return {
        matches: false,
        addEventListener (_: unknown, handler: Function) {
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
          triggerDark({ matches: false })
          triggerLight({ matches: true })
          expect(this.theme).toEqual('light')
          triggerDark({ matches: true })
          triggerLight({ matches: false })
          expect(this.theme).toEqual('dark')
        }
      })
    )
    wrapper.unmount()
  })
  it('works (for addListener)', () => {
    let triggerDark: Function
    let triggerLight: Function
    (window.matchMedia as any) = (query: string) => {
      return {
        matches: false,
        addListener (handler: Function) {
          if (query.includes('light')) {
            triggerLight = handler
          }
          if (query.includes('dark')) {
            triggerDark = handler
          }
        },
        removeListener () {}
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
          triggerDark({ matches: false })
          triggerLight({ matches: true })
          expect(this.theme).toEqual('light')
          triggerDark({ matches: true })
          triggerLight({ matches: false })
          expect(this.theme).toEqual('dark')
        }
      })
    )
    wrapper.unmount()
  })
})
