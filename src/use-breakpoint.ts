import { computed, ComputedRef } from 'vue'
import useBreakpoints, {
  BreakpointOptions,
  ExtractBreakpoint
} from './use-breakpoints'

export default function useBreakpoint<T extends BreakpointOptions> (
  screens?: T
): ComputedRef<ExtractBreakpoint<BreakpointOptions> | undefined> {
  const breakpointsRef = useBreakpoints(screens) as ComputedRef<
  Array<ExtractBreakpoint<BreakpointOptions>>
  >
  return computed(() => {
    const { value } = breakpointsRef
    return value[value.length - 1]
  })
}
