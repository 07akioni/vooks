import { isIos } from './use-is-ios'

const isSafari =
  typeof window === 'undefined'
    ? false
    : isIos || (window as any).safari !== undefined

export default function useIsSafari (): boolean {
  return isSafari
}
