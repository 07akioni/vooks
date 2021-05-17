import { isIos } from './use-is-ios'

const isSafari = isIos || (window as any).safari !== undefined

export default function useIsSafari (): boolean {
  return isSafari
}
