import { computed, ComputedRef } from 'vue'
import useBreakpoints, {
  BreakpointOptions,
  ExtractBreakpoint,
  DefaultBreakpointOptions
} from './use-breakpoints'

type HasZero<T> = {
  [key in keyof T]: T[key] extends 0 ? true : T[key] extends '0' ? true : false
}

type CanBeUndef<T> = HasZero<T> extends {
  [key: string]: false
}
  ? true
  : false

function useBreakpoint (): ComputedRef<
ExtractBreakpoint<DefaultBreakpointOptions>
>
function useBreakpoint<T extends BreakpointOptions> (
  screens: T
): CanBeUndef<T> extends true
  ? ComputedRef<ExtractBreakpoint<T> | undefined>
  : ComputedRef<ExtractBreakpoint<T>>
function useBreakpoint<T extends BreakpointOptions = DefaultBreakpointOptions> (
  screens?: T
): ComputedRef<ExtractBreakpoint<T> | undefined> {
  // pass ts check
  const breakpointsRef =
    screens !== undefined ? useBreakpoints(screens) : useBreakpoints()
  return computed(() => {
    const { value } = breakpointsRef
    return value[value.length - 1]
  })
}

export default useBreakpoint
