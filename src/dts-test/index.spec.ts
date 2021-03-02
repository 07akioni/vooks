import { ComputedRef } from 'vue'
import { useBreakpoint, useBreakpoints } from '../index'

declare function expectType<T> (value: T): void

describe('#use-breakpoint', () => {
  expectType<ComputedRef<string | undefined>>(useBreakpoint())
  expectType<ComputedRef<string | undefined>>(useBreakpoint({ xs: 100 }))
})

describe('#use-breakpoints', () => {
  expectType<ComputedRef<string[]>>(useBreakpoints())
  expectType<ComputedRef<string[]>>(useBreakpoints({ xs: 100 }))
})
