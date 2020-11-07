import { computed, ComputedRef } from 'vue'
import useBreakpoints, { Breakpoint } from './use-breakpoints'

export default function useBreakpoint (): ComputedRef<Breakpoint> {
  const breakpointsRef = useBreakpoints()
  return computed(() => {
    const { value } = breakpointsRef
    return value[value.length - 1]
  })
}
