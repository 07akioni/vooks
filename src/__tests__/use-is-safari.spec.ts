import { useIsSafari } from '../index'

describe('#useIsSafari', () => {
  it('works', () => {
    expect(useIsSafari()).toEqual(false)
  })
})
