import { ref, readonly, Ref, onBeforeMount, onBeforeUnmount } from 'vue'

type Theme = 'light' | 'dark'

let usedCount = 0

// Mql means media query list
const supportMatchMedia = 'matchMedia' in window
const osTheme: Ref<Theme | undefined> = ref()
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
  if (supportMatchMedia) {
    darkMql = window.matchMedia('(prefers-color-scheme: dark)')
    lightMql = window.matchMedia('(prefers-color-scheme: light)')
    if (darkMql.matches) {
      osTheme.value = 'dark'
    } else if (lightMql.matches) {
      osTheme.value = 'light'
    }
    darkMql.addEventListener('change', handleDarkMqlChange)
    lightMql.addEventListener('change', handleLightMqlChange)
  }
}

function clean (): void {
  if (supportMatchMedia) {
    ;(darkMql as MediaQueryList).removeEventListener('change', handleDarkMqlChange)
    ;(lightMql as MediaQueryList).removeEventListener('change', handleLightMqlChange)
    darkMql = undefined
    lightMql = undefined
  }
}

export default function useOsTheme (): Readonly<Ref<Theme | undefined>> {
  if (usedCount === 0) init()
  onBeforeMount(() => { usedCount += 1 })
  onBeforeUnmount(() => {
    usedCount -= 1
    if (usedCount === 0) clean()
  })
  return readonly(osTheme)
}
