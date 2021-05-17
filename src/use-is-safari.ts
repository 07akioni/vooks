import useIsIos from './use-is-ios'

export default function useIsSafari (): boolean {
  return (window as any).safari !== undefined || useIsIos()
}
