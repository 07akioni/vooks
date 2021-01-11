import { onBeforeMount, onBeforeUnmount, ref, Ref } from 'vue'

interface UseNowOptions {
  type: 'number' | 'date'
}

function useNow (interval: boolean | number, options: { type: 'number' }): Ref<number>
function useNow (interval: boolean | number, options: { type: 'date' }): Ref<Date>
function useNow (interval: boolean | number, { type = 'number' }: UseNowOptions): Ref<number | Date> {
  const isNumber = type === 'number'
  const nowRef = ref(isNumber ? Date.now() : new Date())
  if (interval === false) {
    let id: number
    onBeforeMount(() => {
      id = setInterval(() => {
        nowRef.value = isNumber ? Date.now() : new Date()
      })
    })
    onBeforeUnmount(() => {
      clearInterval(id)
    })
  }
  return nowRef
}

export default useNow
