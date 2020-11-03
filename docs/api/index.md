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

### `onFontReady`
**Description**

Triggered when fonts are ready in browser.

**Typing**
```ts
function onFontsReady (cb: () => any): void
```

## OS
### `useOsTheme`
**Description:**

Use the value of current OS theme.

**Typing:**
```ts
function useOsTheme (): Readonly<Ref<Theme | undefined>>
```