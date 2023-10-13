import { useContentFeature } from '@/features/content'
import { PluggableControl } from '@/features/control/types'
import { createInjectionState } from '@/utils/createInjectionState'
import {computed, reactive, ref, UnwrapNestedRefs} from 'vue'
import { toRefs } from 'vue'

const [useProvideContentStore, useDefaultContentStore] = createInjectionState(
  () => {
    const store = toRefs(useContentFeature().useStore())
    return reactive({
      ...store,
    })
  },
)

function useContentStore() {
  return useDefaultContentStore()
}

export { useProvideContentStore, useContentStore }
