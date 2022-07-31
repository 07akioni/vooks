import { defineComponent } from 'vue'
import { onFontsReady } from '../index'
import { init } from '../on-fonts-ready'
import { mount, sleep } from './utils'

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
  it('should do nothing when documnt does not support fonts.ready', async () => {
    const fn = vi.fn()
    const wrapper = mount(defineComponent({
      setup () {
        onFontsReady(fn)
      }
    }))
    await sleep(0)
    expect(fn).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should be called when documnt supports fonts.ready', async () => {
    const fn = vi.fn()
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
    await sleep(1000)
    expect(fn).toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should not be called when comoponent is unmounted', () => {
    const fn = vi.fn()
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
