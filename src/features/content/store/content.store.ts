import { useContentFeature } from '@/features/content'
import { createInjectionState } from '@/utils/createInjectionState'
import { computed, reactive, toRefs, unref } from 'vue'

const [useProvideContentStore, useDefaultContentStore] = createInjectionState(
  () => {
    const store = toRefs(useContentFeature().useStore())
    return reactive({
      ...store,
      contentProcessed: computed(() => {
        let content = unref(store.content)

        if (!unref(store.propertiesVisibility) && content.startsWith('---')) {
          content = content.replace(/^---[\s\S]*?---/, '')
        }

        return content
      }),
    })
  },
)

function useContentStore() {
  return useDefaultContentStore()
}

export { useProvideContentStore, useContentStore }
