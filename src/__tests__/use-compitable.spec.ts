import { reactive } from 'vue'
import { useCompitable } from '../index'

describe('# useCompitable', () => {
  it('works', () => {
    const props: {
      oldKey?: number
      newKey?: number
    } = reactive({
      oldKey: undefined,
      newKey: 1
    })
    const compitableRef = useCompitable(props, ['oldKey', 'newKey'])
    expect(compitableRef.value).toEqual(1)
    props.oldKey = 2
    expect(compitableRef.value).toEqual(2)
    props.oldKey = undefined
    props.newKey = undefined
    expect(compitableRef.value).toEqual(undefined)
  })
})
