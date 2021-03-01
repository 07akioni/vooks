# API
## Data
### `useFalseUntilTruthy`
**Description:**

It's `false` until `originalRef` value is truthy. Then it will be `true`.

**Typing:**
```ts
function useFalseUntilTruthy (originalRef: Ref<any>): Readonly<Ref<boolean>>
```

### `useMemo`
**Description**

Like `computed`. If computed value is not changed, component's render won't be triggered. Use it for performance.

**Typing**
```ts
function useMemo<T> (valueGenerator: () => T): DeepReadonly<Ref<T>>
```

### `useMergedState`
**Description**

Merge controlled state and uncontrolled state. If controlled state value is not `undefined`, use `controlledStateRef.value` else use `uncontrolledStateRef.value`.

**Typing**
```ts
function useMergedState<T> (
  controlledStateRef: Ref<T>,
  uncontrolledStateRef: Ref<T>
): ComputedRef<T>
```

### `useCompitable`
**Description**

Pick first non `undefined` value from an object.

**Typing**
```ts
function useCompitable<T extends object, V extends keyof T> (
  reactive: T,
  keys: V[]
): ComputedRef<T[GetArrayElementType<V[]>]> {
```

## Vue
### `useIsMounted`
**Description**

If component is mounted.

**Typing**
```ts
function isMounted (): Readonly<Ref<Boolean>>
```

## DOM
### `useClickPosition`
**Description:**

Last click position of mouse.

**Typing:**
```ts
function useClickPosition (): Readonly<Ref<MousePosition | undefined>>
```

### `useClicked`
**Description**

It is `true` after clicked and before timeout is reached. Otherwise it is `false`.

**Typing**
```ts
function useClicked (timeout: number): Readonly<Ref<boolean>>
```

### `onFontsReady`
**Description**

Triggered when fonts are ready in browser.

**Typing**
```ts
function onFontsReady (cb: () => any): void
```

### `useBreakpoints`
**Description**
The current covered breakpoints of browser window size.

**Typing**
```ts
function useBreakpoints (screens?: { [key: string]: number }): ComputedRef<ScreenBreakpoint[]>
```

**Params**
Default value of `screens` is
```
{
  xs: 0, // mobile
  s: 640, // tablet
  m: 1024, // laptop s
  l: 1280, // laptop
  xl: 1536, // laptop l
  xxl: 1920 // normal desktop display
}
```

**Example**
```ts
const breakpointsRef = useBreakpoints({ s: 500, m: 1000 })
// returns [] (<500px)
// returns ['s'] (>=500px, <1000px)
// returns ['s', 'm'] (>=1000px)
```

### `useBreakpoint`
**Description**
The current browser window size. It's the last array value of `useBreakpoints`.

Returns `undefined` if no corresponding screen size exists.

Default `screens` value is the same as `useBreakpoints`.

**Typing**
```ts
function useBreakpoint (screens?: { [key: string]: number }): ComputedRef<ScreenBreakpoint> | undefined
```
## OS
### `useOsTheme`
**Description:**

Use the value of current OS theme.

**Typing:**
```ts
function useOsTheme (): Readonly<Ref<Theme | undefined>>
```

### `useIsIos`
**Description**

If current OS is iOS


**Typing**
```ts
function useIsIos (): boolean
```