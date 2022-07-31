/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, nextTick } from 'vue'
import { useIsMounted } from '../index'
import { mount } from './utils'

describe('# useIsMounted', () => {
  it('works', async () => {
    const wrapper = mount(defineComponent({
      setup () {
        const isMounted = useIsMounted()
        expect(isMounted.value).toEqual(false)
        return {
          isMounted
        }
      },
      beforeMount () {
        expect(this.isMounted).toEqual(false)
      },
      mounted () {
        nextTick(() => {
          expect(this.isMounted).toEqual(true)
          wrapper.unmount()
        })
      }
    }))
  })
})
