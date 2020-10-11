type ElToHandlers = Map<EventTarget, Set<(e: Event) => any>>
type UnifiedHandler = (e: Event) => any

interface Delegate {
  on: (type: string, el: EventTarget, handler: (e: Event) => any) => void
  off: (type: string, el: EventTarget, handler: (e: Event) => any) => void
}

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
      // bubbling
      while (true) {
        if (cursor === null) cursor = window
        const handlers = elToHandlers.get(cursor)
        if (handlers !== undefined) {
          handlers.forEach(handler => handler(e))
        }
        if (cursor === window) {
          break
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        cursor = ((cursor as any).parentElement || null) as (EventTarget | null)
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
      window.addEventListener(type, unifiedHandler)
    }
    return typeToElToHandlers[type] as ElToHandlers
  }
  function ensureHandlers (
    elToHandlers: ElToHandlers,
    el: EventTarget
  ): Set<(e: Event) => any> {
    let elHandlers = elToHandlers.get(el)
    if (elHandlers === undefined) {
      elToHandlers.set(el, (elHandlers = new Set()))
    }
    return elHandlers
  }
  function on (
    type: string,
    el: EventTarget,
    handler: (e: Event) => any
  ): void {
    const elToHandlers = ensureElToHandlers(type)
    const handlers = ensureHandlers(elToHandlers, el)
    if (!handlers.has(handler)) handlers.add(handler)
  }
  function off (type: string, el: EventTarget, handler: (e: Event) => any): void {
    const elToHandlers = ensureElToHandlers(type)
    const handlers = ensureHandlers(elToHandlers, el)
    if (handlers.has(handler)) handlers.delete(handler)
    if (handlers.size === 0) {
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
