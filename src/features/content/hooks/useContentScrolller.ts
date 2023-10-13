import {
  computed,
  type MaybeRef,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue'
import type { MaybeElementRef } from '@vueuse/core'

export function useContentScroller(options: {
  element: MaybeElementRef<HTMLElement>
  speed: MaybeRef<number>
  isPlaying: MaybeRef<boolean>
}) {
  const speed = computed(() => unref(options.speed) * 5)
  const scrollDelay = computed(() =>
    100 - speed.value > 0 ? 100 - speed.value : 0,
  )
  const scrollStep = computed(
    () => 1 + (!scrollDelay.value ? speed.value / 100 : 0),
  )
  const timeout = ref<number>()

  onMounted(() => scroll())
  onBeforeUnmount(() => clearTimeout(timeout.value))

  function scroll() {
    if (!unref(options.isPlaying) || !unref(options.element)) return
    requestAnimationFrame(() => {
      if (unref(options.speed)) {
        unref(options.element)?.scrollBy(0, scrollStep.value)
      }
      if (timeout.value) clearTimeout(timeout.value)
      timeout.value = setTimeout(scroll, scrollDelay.value)
    })
  }

  watch(() => unref(options.isPlaying), scroll)
}
