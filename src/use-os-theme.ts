import { ref, readonly, Ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { hasInstance } from './utils'

type Theme = 'light' | 'dark'

let usedCount = 0

// Mql means media query list
const supportMatchMedia =
  typeof window !== 'undefined' && window.matchMedia !== undefined
const osTheme: Ref<Theme | null> = ref(null)
let darkMql: MediaQueryList | undefined
let lightMql: MediaQueryList | undefined

function handleDarkMqlChange (e: MediaQueryListEvent): void {
  if (e.matches) {
    osTheme.value = 'dark'
  }
}
function handleLightMqlChange (e: MediaQueryListEvent): void {
  if (e.matches) {
    osTheme.value = 'light'
  }
}

function init (): void {
  darkMql = window.matchMedia('(prefers-color-scheme: dark)')
  lightMql = window.matchMedia('(prefers-color-scheme: light)')
  if (darkMql.matches) {
    osTheme.value = 'dark'
  } else if (lightMql.matches) {
    osTheme.value = 'light'
  } else {
    osTheme.value = null
  }
  darkMql.addEventListener('change', handleDarkMqlChange)
  lightMql.addEventListener('change', handleLightMqlChange)
}

function clean (): void {
  ;(darkMql as MediaQueryList).removeEventListener(
    'change',
    handleDarkMqlChange
  )
  ;(lightMql as MediaQueryList).removeEventListener(
    'change',
    handleLightMqlChange
  )
  darkMql = undefined
  lightMql = undefined
}

let managable = true

export default function useOsTheme (): Readonly<Ref<Theme | null>> {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test' && !supportMatchMedia) { return readonly(osTheme) }
  if (process.env.NODE_ENV === 'test' && window.matchMedia === undefined) { return readonly(osTheme) }
  if (usedCount === 0) init()
  if (managable && (managable = hasInstance())) {
    onBeforeMount(() => {
      usedCount += 1
    })
    onBeforeUnmount(() => {
      usedCount -= 1
      if (usedCount === 0) clean()
    })
  }
  return readonly(osTheme)
}
