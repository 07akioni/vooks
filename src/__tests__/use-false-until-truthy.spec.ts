import {
  ref,
  nextTick
} from 'vue'
import {
  useFalseUntilTruthy
} from '../index'

describe('# useFalseUntilTruthy', () => {
  it('works with init value `false`', async () => {
    const originalRef = ref<any>(false)
    const testRef = useFalseUntilTruthy(originalRef)
    expect(testRef.value).toEqual(false)
    originalRef.value = null
    await nextTick()
    expect(testRef.value).toEqual(false)
    originalRef.value = true
    await nextTick()
    expect(testRef.value).toEqual(true)
    originalRef.value = false
    await nextTick()
    expect(testRef.value).toEqual(true)
  })
  it('works with init value `true`', async () => {
    const originalRef = ref(true)
    const testRef = useFalseUntilTruthy(originalRef)
    expect(testRef.value).toEqual(true)
    originalRef.value = false
    await nextTick()
    expect(testRef.value).toEqual(true)
  })
})
