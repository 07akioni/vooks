import { useKeyboard } from '../index'
import { mount } from './utils'
import { defineComponent } from 'vue'

describe('# useKeyboard', () => {
  it('works with keyup & keydown', () => {
    const KeyDownArrowUp = jest.fn()
    const KeyUpArrowDown = jest.fn()
    const wrapper = mount(defineComponent({
      setup () {
        useKeyboard({
          keydown: {
            ArrowUp: KeyDownArrowUp
          },
          keyup: {
            ArrowDown: KeyUpArrowDown
          }
        })
      }
    }))
    expect(KeyDownArrowUp).toHaveBeenCalledTimes(0)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    expect(KeyDownArrowUp).toHaveBeenCalledTimes(1)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    expect(KeyDownArrowUp).toHaveBeenCalledTimes(2)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(KeyDownArrowUp).toHaveBeenCalledTimes(2)
    expect(KeyUpArrowDown).toHaveBeenCalledTimes(0)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown', bubbles: true }))
    expect(KeyUpArrowDown).toHaveBeenCalledTimes(1)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown', bubbles: true }))
    expect(KeyUpArrowDown).toHaveBeenCalledTimes(2)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp', bubbles: true }))
    expect(KeyUpArrowDown).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown', bubbles: true }))
    expect(KeyDownArrowUp).toHaveBeenCalledTimes(2)
    expect(KeyUpArrowDown).toHaveBeenCalledTimes(2)
  })
  it('works with pressed key', () => {
    const wrapper = mount(defineComponent({
      setup () {
        return {
          state: useKeyboard()
        }
      }
    }))
    expect((wrapper.instance as any).state.tab).toEqual(false)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
    expect((wrapper.instance as any).state.tab).toEqual(true)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }))
    expect((wrapper.instance as any).state.tab).toEqual(false)
  })
})
