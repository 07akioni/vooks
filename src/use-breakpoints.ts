/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ref, computed, onBeforeUnmount, ComputedRef } from 'vue'

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'
const breakpoints: Breakpoint[] = ['xs', 's', 'm', 'l', 'xl']

type BreakpointStatus = {
  [key in Breakpoint]: boolean
}

type mqlHandler = (e: MediaQueryListEvent) => void

type BreakpointHandler = {
  [key in Breakpoint]: mqlHandler
}

const breakpointStatusRef = ref<BreakpointStatus>({} as BreakpointStatus)

const mediaQueries: {
  [key in Breakpoint]: string
} = {
  xs: '(min-width: 0px)',
  s: '(min-width: 600px)',
  m: '(min-width: 1024px)',
  l: '(min-width: 1440px)',
  xl: '(min-width: 1920px)'
}

const handlerMap: BreakpointHandler = Object.fromEntries(breakpoints.map(k => {
  return [
    k,
    (e: MediaQueryListEvent) => {
      breakpointStatusRef.value[k] = e.matches
    }
  ]
})) as any

type MqlMap = {
  [key in Breakpoint]?: MediaQueryList
}
const mqlMap: MqlMap = {} as MqlMap

function init (): void {
  breakpointStatusRef.value = (
    Object.entries(mediaQueries) as Array<[Breakpoint, string]>
  ).reduce(
    (breakpointStatus, [key, value]) => {
      const mql = window.matchMedia(value)
      mqlMap[key] = mql
      breakpointStatus[key] = mql.matches
      mql.addEventListener('change', handlerMap[key])
      return breakpointStatus
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as BreakpointStatus
  )
}

function clear (): void {
  breakpoints.forEach((key) => {
    mqlMap[key]?.removeEventListener('change', handlerMap[key])
    mqlMap[key] = undefined
  })
}

let usedCount: number = 0

export default function useBreakpoints (): ComputedRef<Breakpoint[]> {
  if (usedCount === 0) {
    usedCount++
    init()
  }
  onBeforeUnmount(() => {
    usedCount--
    if (usedCount === 0) {
      clear()
    }
  })
  return computed<Breakpoint[]>(() => {
    const { value } = breakpointStatusRef
    return breakpoints.filter(key => value[key])
  })
}
