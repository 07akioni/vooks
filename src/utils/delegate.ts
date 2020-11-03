interface Handlers {
  bubble: Set<(e: Event) => any>
  capture: Set<(e: Event) => any>
}
type ElToHandlers = Map<EventTarget, Handlers>
type UnifiedHandler = (e: Event) => any

interface Delegate {
  on:
  ((type: string, el: EventTarget, handler: (e: Event) => any, useCapture?: boolean) => void) &
  ((type: string, el: EventTarget, handler: (e: Event) => any, options?: EventListenerOptions) => void)
  off:
  ((type: string, el: EventTarget, handler: (e: Event) => any, useCapture?: boolean) => void) &
  ((type: string, el: EventTarget, handler: (e: Event) => any, useCapture?: EventListenerOptions) => void)
}

// currently `once` and `passive` is not supported
function createDelegate (): Delegate {
  const typeToElToHandlers: {
    [key: string]: ElToHandlers | undefined
  } = {}
  const typeToUnfiedHandler: {
    [key: string]: ((e: Event) => void) | undefined
  } = {}
  function createUnifiedHandler (
    type: string,
    elToHandlers: ElToHandlers
  ): (e: Event) => any {
    const delegeteHandler = function (e: Event): void {
      let cursor = e.target
      const path = []
      // collecting bubble path
      while (true) {
        if (cursor === null) cursor = window
        path.push(cursor)
        if (cursor === window) {
          break
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        cursor = ((cursor as any).parentElement || null) as (EventTarget | null)
      }
      // capture
      for (let i = path.length - 1; i >= 0; --i) {
        const handlers = elToHandlers.get(path[i])
        if (handlers !== undefined) {
          handlers.capture.forEach(handler => handler(e))
        }
      }
      // bubble
      for (let i = 0; i < path.length; ++i) {
        const handlers = elToHandlers.get(path[i])
        if (handlers !== undefined) {
          handlers.bubble.forEach(handler => handler(e))
        }
      }
    }
    delegeteHandler.displayName = `${type}UnifiedHandler`
    return delegeteHandler
  }
  function ensureUnifiedHandler (
    type: string
  ): (e: Event) => any {
    const elToHandlers = ensureElToHandlers(type)
    if (
      typeToUnfiedHandler[type] === undefined
    ) {
      typeToUnfiedHandler[type] = createUnifiedHandler(
        type,
        elToHandlers
      )
    }
    return typeToUnfiedHandler[type] as UnifiedHandler
  }
  function ensureElToHandlers (type: string): ElToHandlers {
    if (typeToElToHandlers[type] === undefined) {
      typeToElToHandlers[type] = new Map()
      const unifiedHandler = ensureUnifiedHandler(type)
      window.addEventListener(type, unifiedHandler, true)
    }
    return typeToElToHandlers[type] as ElToHandlers
  }
  function ensureHandlers (
    elToHandlers: ElToHandlers,
    el: EventTarget
  ): Handlers {
    let elHandlers = elToHandlers.get(el)
    if (elHandlers === undefined) {
      elToHandlers.set(el, (elHandlers = {
        bubble: new Set(),
        capture: new Set()
      }))
    }
    return elHandlers
  }
  function on (
    type: string,
    el: EventTarget,
    handler: (e: Event) => any,
    options?: boolean | EventListenerOptions
  ): void {
    const elToHandlers = ensureElToHandlers(type)
    const handlers = ensureHandlers(elToHandlers, el)
    const phase = (
      options === true || (typeof options === 'object' && options.capture === true)
    ) ? 'capture' : 'bubble'
    const phaseHandlers = handlers[phase]
    if (!phaseHandlers.has(handler)) phaseHandlers.add(handler)
  }
  function off (
    type: string,
    el: EventTarget,
    handler: (e: Event) => any,
    options?: boolean | EventListenerOptions
  ): void {
    const elToHandlers = ensureElToHandlers(type)
    const handlers = ensureHandlers(elToHandlers, el)
    const phase = (
      options === true || (typeof options === 'object' && options.capture === true)
    ) ? 'capture' : 'bubble'
    const phaseHandlers = handlers[phase]
    if (phaseHandlers.has(handler)) phaseHandlers.delete(handler)
    if (phaseHandlers.size === 0) {
      elToHandlers.delete(el)
    }
    if (elToHandlers.size === 0) {
      const unifiedHandler = ensureUnifiedHandler(type)
      window.removeEventListener(type, unifiedHandler)
      typeToElToHandlers[type] = undefined
      typeToUnfiedHandler[type] = undefined
    }
  }
  return {
    on,
    off
  }
}

const {
  on,
  off
} = createDelegate()

export { on, off }
