class ClickDelegate {
  private usedCount: number = 0

  private readonly elHandlersMap: Map<Element | Window, Array<(e: MouseEvent) => any>> = new Map()

  private init (): void {
    window.addEventListener('click', this.handleClick)
  }

  private clean (): void {
    window.removeEventListener('click', this.handleClick)
  }

  private handleClick (e: MouseEvent): any {
    const windowHandlers = this.elHandlersMap.get(window)
    if (windowHandlers !== undefined) {
      windowHandlers.forEach(h => h(e))
    }
    const targetHandlers = this.elHandlersMap.get(e.target as Element)
    if (targetHandlers !== undefined) {
      targetHandlers.forEach(h => h(e))
    }
  }

  add (el: Element | Window, handler: (e: MouseEvent) => any): void {
    if (this.usedCount === 0) {
      this.init()
    }
    let handlers = this.elHandlersMap.get(el)
    if (handlers === undefined) {
      this.elHandlersMap.set(el, handlers = [])
    }
    handlers.push(handler)
    this.usedCount += 1
  }

  remove (el: Element | Window, handler: (e: MouseEvent) => any): void {
    this.usedCount -= 1
    const handlers = this.elHandlersMap.get(el)
    if (handlers !== undefined) {
      handlers.splice(handlers.findIndex(h => h === handler), 1)
    }
    if (this.usedCount === 0) {
      this.clean()
    }
  }
}

export default new ClickDelegate()
