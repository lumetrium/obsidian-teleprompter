import { useFeatures } from '@/features/feature'
import type { Feature, FeatureLoadOptions } from '@/features/types'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { watch } from 'vue'
export async function loadFeatures(options: FeatureLoadOptions): Promise<void> {
  import.meta.glob('./*/index.ts', { eager: true })
  const { features } = useFeatures()

  Object.values(features.value).forEach((feature: Feature<unknown>) => {
    const { useStore, persist } = feature
    if (!useStore || persist === false) return

    const store = useStore()

    // restore
    const savedState = options.restore(feature.id)
    const mergeFn =
      persist?.merge ??
      ((state, savedState) => ({
        ...state,
        ...savedState,
      }))

    const combinedState = mergeFn(store, cloneDeep(savedState))
    merge(store, combinedState)

    // persist
    watch(store, (state) => {
      const reduceFn = persist?.reduce ?? ((state: unknown) => state)
      return options.persist(feature.id, reduceFn(state))
    })
  })
}
