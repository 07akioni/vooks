import { defineComponent } from 'vue'
import { useClicked } from '../index'
import { mount } from './utils'

describe('# useClicked', () => {
  it('works', (done) => {
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
    setTimeout(() => {
      expect((wrapper.instance as any).clicked).toEqual(false)
      wrapper.unmount()
      done()
    }, 200)
  })
  it('works on multiple instances', (done) => {
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
    setTimeout(() => {
      expect((wrapper.instance as any).clicked).toEqual(false)
      expect((wrapper2.instance as any).clicked).toEqual(false)
      wrapper.unmount()
      document.dispatchEvent(new MouseEvent('click'))
      expect((wrapper2.instance as any).clicked).toEqual(true)
      setTimeout(() => {
        expect((wrapper2.instance as any).clicked).toEqual(false)
        wrapper2.unmount()
        done()
      }, 200)
    }, 200)
  })
})
