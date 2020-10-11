import { on, off } from '../../utils'

describe('# delegate', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="outer"><div id="inner"></div></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('dispatch on window', () => {
    const cb = jest.fn()
    on('click', window, cb)
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(1)
    off('click', window, cb)
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(1)
  })
  it('dispatch on outer div', () => {
    const cb = jest.fn()
    on('click', window, cb)
    const inner = document.getElementById('outer') as HTMLDivElement
    inner.dispatchEvent(new Event('click', { bubbles: true }))
    expect(cb).toHaveBeenCalledTimes(1)
    off('click', window, cb)
    inner.dispatchEvent(new Event('click', { bubbles: true }))
    expect(cb).toHaveBeenCalledTimes(1)
  })
  it('dispatch on inner div', () => {
    const cb = jest.fn()
    const outer = document.getElementById('outer') as HTMLDivElement
    const inner = document.getElementById('inner') as HTMLDivElement
    on('click', outer, cb)
    inner.dispatchEvent(new Event('click', { bubbles: true }))
    expect(cb).toHaveBeenCalledTimes(1)
    off('click', outer, cb)
    inner.dispatchEvent(new Event('click', { bubbles: true }))
    expect(cb).toHaveBeenCalledTimes(1)
  })
  it('add duplicate handler', () => {
    const cb = jest.fn()
    on('click', window, cb)
    on('click', window, cb)
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(1)
    off('click', window, cb)
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(1)
  })
  it('remove unregistered handler', () => {
    const cb = jest.fn()
    on('click', window, cb)
    on('click', window, cb)
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(1)
    off('click', window, () => {})
    window.dispatchEvent(new Event('click'))
    expect(cb).toHaveBeenCalledTimes(2)
    off('click', window, cb)
  })
})
