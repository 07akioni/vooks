import { defineComponent } from 'vue'
import { onFontsReady } from '../index'
import { init } from '../on-fonts-ready'
import { mount } from './utils'

describe('# onFontsReady', () => {
  let fonts: any
  beforeEach(() => {
    fonts = (document as any).fonts
    ;(document as any).fonts = {
      ready: undefined
    }
  })
  afterEach(() => {
    (document as any).fonts = fonts
  })
  it('should do nothing when documnt does not support fonts.ready', (done) => {
    const fn = jest.fn()
    const wrapper = mount(defineComponent({
      setup () {
        onFontsReady(fn)
      }
    }))
    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 0)
  })
  it('should be called when documnt supports fonts.ready', (done) => {
    const fn = jest.fn()
    ;(document as any).fonts = {
      ready: new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    }
    init()

    console.log('document.fonts', document.fonts)
    const wrapper = mount(
      defineComponent({
        setup () {
          onFontsReady(fn)
        }
      })
    )
    setTimeout(() => {
      expect(fn).toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 1000)
  })
  it('should not be called when comoponent is unmounted', () => {
    const fn = jest.fn()
    let res: any
    ;(document as any).fonts = {
      ready: new Promise(resolve => { res = resolve })
    }
    const wrapper = mount(defineComponent({
      setup () {
        onFontsReady(fn)
      }
    }))
    wrapper.unmount()
    res()
    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled()
    }, 0)
  })
})
