import { type Ref, ref } from 'vue'

export function createStateAccessor<T>(
  initial: T,
  options: {
    onGet?: (value: T) => T
    onSet?: (value: T) => void
  } = {},
) {
  const state = ref(initial) as Ref<T>

  function set(value: T) {
    state.value = value
    options.onSet?.(value)
  }

  function get(): T {
    const value = state.value
    return options.onGet?.(value) ?? value
  }

  return {
    set,
    get,
  }
}
