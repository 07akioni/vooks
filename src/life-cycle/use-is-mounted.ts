import {
  ref,
  onMounted,
  readonly,
  Ref
} from 'vue'

export default function isMounted (): Readonly<Ref<Boolean>> {
  const isMounted = ref(false)
  onMounted(() => { isMounted.value = true })
  return readonly(isMounted)
}
