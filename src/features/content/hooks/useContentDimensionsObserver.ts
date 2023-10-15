import {
  type MaybeElementRef,
  useMutationObserver,
  useResizeObserver,
  useScroll,
} from '@vueuse/core'
import { debounce } from 'obsidian'
import { toRefs, unref, watch } from 'vue'
import { useContentFeature } from '@/features/content'

export function useContentDimensionsObserver(
  element: MaybeElementRef<HTMLElement>,
) {
  const store = useContentFeature().useStore()
  function persistDimensions() {
    const target = unref(element)
    if (!target) return
    store.contentScrollTop = target.scrollTop
    store.contentScrollHeight = target.scrollHeight
    store.contentHeight = target.clientHeight

    // can't use target.clientWidth here because it's rounding the value
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
    store.contentWidth = target.firstElementChild?.getBoundingClientRect().width
  }

  const persistDimensionsDebounced = debounce(persistDimensions, 10, true)

  useMutationObserver(element, (entries) => persistDimensionsDebounced(), {
    attributes: true,
  })
  useResizeObserver(element, (entries) => persistDimensionsDebounced())
  useScroll(element, { onScroll: persistDimensions })


/*  const resizeObserver = new ResizeObserver((entries) => {
    persistDimensionsDebounced()
  })

  watch(element, (el) => {
    resizeObserver.observe(unref(el))
  }, { immediate: true })

  onBeforeUnmount(() => {
    resizeObserver.unobserve()
  })*/

  watch(
    () => store.scrollBy,
    ({ deltaY }) => {
      unref(element)?.scrollBy({
        top: deltaY,
        left: 0,
        behavior: 'instant',
      })
    },
  )
}
