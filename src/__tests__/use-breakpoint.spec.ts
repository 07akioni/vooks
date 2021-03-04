import { useBreakpoint } from '../index'
import { mount } from './utils'

describe('# useBreakpoint', () => {
  it('should work without error in jsdom env', () => {
    const { unmount } = mount({
      setup () {
        useBreakpoint()
      }
    })
    unmount()
  })
})
