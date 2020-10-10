import { defineComponent, nextTick, ref } from 'vue'
import {
  mount
} from './utils'
import {
  useMemo
} from '../index'

describe('# useMemo', () => {
  it('only trigger render once', async () => {
    const mock = jest.fn()
    const depRef = ref(0)
    const wrapper = mount(defineComponent({
      setup () {
        return {
          memoValue: useMemo(() => {
            return depRef.value < 2 ? '<2' : '>=2'
          })
        }
      },
      renderTriggered: mock,
      render () {
        return this.memoValue
      }
    }))
    depRef.value = 1
    await nextTick()
    expect(mock).toHaveBeenCalledTimes(0)
    depRef.value = 2
    await nextTick()
    expect(mock).toHaveBeenCalledTimes(1)
    depRef.value = 3
    await nextTick()
    expect(mock).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
