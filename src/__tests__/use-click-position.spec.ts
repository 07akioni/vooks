import { mount } from './utils'
import { useClickPosition } from '../index'
import { defineComponent } from 'vue'

describe('# useClickPosition', () => {
  it('is null when not clicked', () => {
    const wrapper = mount(defineComponent({
      setup () {
        return {
          position: useClickPosition()
        }
      },
      mounted () {
        expect(this.position).toEqual(null)
      }
    }))
    wrapper.unmount()
  })
  it('works', () => {
    const comp = defineComponent({
      setup () {
        return {
          position: useClickPosition()
        }
      },
      mounted () {
        document.dispatchEvent(new MouseEvent('click', {
          clientX: 100,
          clientY: 100,
          bubbles: true
        }))
        expect(this.position).toEqual({
          x: 100,
          y: 100
        })
      }
    })
    // use two wrappers to cover all lines
    const wrapper1 = mount(comp)
    const wrapper2 = mount(comp)
    wrapper1.unmount()
    wrapper2.unmount()
  })
})
