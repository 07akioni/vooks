import { mount } from './utils'
import { useClickPosition } from '../index'
import { defineComponent } from 'vue'

describe('# useClickPosition', () => {
  it('is null when not clicked', (done) => {
    const wrapper = mount(defineComponent({
      setup () {
        return {
          position: useClickPosition()
        }
      },
      mounted () {
        expect(this.position).toEqual(null)
        done()
      }
    }))
    wrapper.unmount()
  })
  it('works', (done) => {
    const comp = defineComponent({
      setup () {
        return {
          position: useClickPosition()
        }
      },
      mounted () {
        window.dispatchEvent(new MouseEvent('click', {
          clientX: 100,
          clientY: 100
        }))
        expect(this.position).toEqual({
          x: 100,
          y: 100
        })
        done()
      }
    })
    // use two wrappers to cover all lines
    const wrapper1 = mount(comp)
    const wrapper2 = mount(comp)
    wrapper1.unmount()
    wrapper2.unmount()
  })
})
