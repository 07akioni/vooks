/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ref, computed, onBeforeUnmount, ComputedRef } from 'vue'

export type BreakpointOptions = Record<string, number>
export type ExtractBreakpoint<T extends Record<string, number>> = keyof T
export type ExtractBreakpointStatus<T> = {
  [k in keyof T]: boolean
}
export type BreakpointHandler = {
  [k in string]: mqlHandler
}
export type ExtractMediaQueries<T> = {
  [key in keyof T]: string
}

const defaultBreakpointOptions: BreakpointOptions = {
  // mobile
  // 0 ~ 640 doesn't mean it should display well in all the range,
  // but means you should treat it like a mobile phone.)
  xs: 0,
  s: 640, // tablet
  m: 1024, // laptop s
  l: 1280, // laptop
  xl: 1536, // in my point of view, 1280 and 1440 should share the same layout in most time
  xxl: 1920 // normal desktop display
}

type mqlHandler = (e: MediaQueryListEvent) => void

function createMediaQuery (screenWidth: number): string {
  return `(min-width: ${screenWidth}px)`
}

type MqlMap = {
  [key in string]: {
    mql: MediaQueryList
    cbs: Set<OnMqlChange>
  }
}
const mqlMap: MqlMap = {} as MqlMap

type OnMqlChange = (e: MediaQueryListEvent | MediaQueryList, breakpointName: string) => void

export default function useBreakpoints<T extends BreakpointOptions> (
  screens: T = defaultBreakpointOptions as T
): ComputedRef<Array<ExtractBreakpoint<T>>> {
  type BreakpointStatus = ExtractBreakpointStatus<T>

  const breakpointStatusRef = ref<BreakpointStatus>({} as BreakpointStatus)
  const breakpoints = Object.keys(screens)

  const updateBreakpoints: OnMqlChange = (e, breakpointName) => {
    if (e.matches) breakpointStatusRef.value[breakpointName] = true
    else breakpointStatusRef.value[breakpointName] = false
  }

  breakpoints.forEach(key => {
    const breakpointValue = screens[key]
    let mql: MediaQueryList
    let cbs: Set<OnMqlChange>
    if (mqlMap[breakpointValue] === undefined) {
      mql = window.matchMedia(createMediaQuery(breakpointValue))
      mql.addEventListener('change', (e: MediaQueryListEvent) => {
        cbs.forEach(cb => {
          cb(e, key)
        })
      })
      cbs = new Set()
      mqlMap[breakpointValue] = {
        mql,
        cbs
      }
    } else {
      mql = mqlMap[breakpointValue].mql
      cbs = mqlMap[breakpointValue].cbs
    }
    cbs.add(updateBreakpoints)
    if (mql.matches) {
      cbs.forEach(cb => {
        cb(mql, key)
      })
    }
  })

  onBeforeUnmount(() => {
    breakpoints.forEach(breakpoint => {
      const { cbs } = mqlMap[screens[breakpoint]]
      if (cbs.has(updateBreakpoints)) {
        cbs.delete(updateBreakpoints)
      }
    })
  })

  return computed<Array<ExtractBreakpoint<T>>>(() => {
    const { value } = breakpointStatusRef
    return breakpoints.filter((key) => value[key]) as any
  })
}
