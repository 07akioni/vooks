import { defineComponent } from 'vue'
import { useClicked } from '../index'
import { mount, sleep } from './utils'

describe('# useClicked', () => {
  it('works', async () => {
    const wrapper = mount(defineComponent({
      setup () {
        return {
          clicked: useClicked(100)
        }
      },
      mounted () {
        document.dispatchEvent(new MouseEvent('click', {
          bubbles: true
        }))
        expect(this.clicked).toEqual(true)
      }
    }))
    await sleep(200)
    expect((wrapper.instance as any).clicked).toEqual(false)
    wrapper.unmount()
  })
  it('works on multiple instances', async () => {
    const comp = defineComponent({
      setup () {
        return {
          clicked: useClicked(100)
        }
      },
      mounted () {
        document.dispatchEvent(new MouseEvent('click', {
          bubbles: true
        }))
        expect(this.clicked).toEqual(true)
      }
    })
    const wrapper = mount(comp)
    const wrapper2 = mount(comp)
    await sleep(200)
    await (async () => {
      expect((wrapper.instance as any).clicked).toEqual(false)
      expect((wrapper2.instance as any).clicked).toEqual(false)
      wrapper.unmount()
      document.dispatchEvent(new MouseEvent('click'))
      expect((wrapper2.instance as any).clicked).toEqual(true)
      await sleep(200)
      expect((wrapper2.instance as any).clicked).toEqual(false)
      wrapper2.unmount()
    })()
  })
})
