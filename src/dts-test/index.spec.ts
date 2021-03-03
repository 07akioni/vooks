import { ComputedRef } from 'vue'
import { useBreakpoint, useBreakpoints } from '../index'

declare function expectType<T> (value: T): void

describe('#use-breakpoint', () => {
  expectType<ComputedRef<'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'>>(useBreakpoint())
  expectType<ComputedRef<'xs' | undefined>>(useBreakpoint({ xs: 100 }))
  expectType<ComputedRef<'xs' | 's'>>(useBreakpoint({ xs: 0, s: 100 } as const))
  const ambigious: Record<string, number> = {}
  expectType<ComputedRef<string | undefined>>(useBreakpoint(ambigious))
})

describe('#use-breakpoints', () => {
  expectType<ComputedRef<Array<'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'>>>(useBreakpoints())
  expectType<ComputedRef<Array<'xs' | undefined>>>(useBreakpoints({ xs: 100 }))
})