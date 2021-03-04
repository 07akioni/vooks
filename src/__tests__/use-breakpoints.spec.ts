import { useBreakpoints } from '../index'
import { mount } from './utils'

describe('# useBreakpoints', () => {
  it('should work without error in jsdom env', () => {
    const { unmount } = mount({
      setup () {
        useBreakpoints()
      }
    })
    unmount()
  })
})
