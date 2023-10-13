import type { Feature, FeatureEventListener, FeatureSetup } from '@/features/types'
import { reactive, ref } from 'vue'

const features = ref<{ [id: string]: Feature<any, any> }>({})

const listeners = ref<{
  [featureId: string]: { [event: string]: Set<FeatureEventListener> }
}>({})

export function useFeatures() {
  return {
    features,
    listeners,
  }
}

export function defineFeatureEmits(featureId: string, events: string[]) {
  return (event: string) => {
    if (events.includes(event)) {
      const listenersSet = listeners.value[featureId]?.[event]
      if (listenersSet?.size) listenersSet.forEach((listener) => listener())
    }
  }
}

export function defineFeature<F, State, Actions, ID extends string = string>(
  id: ID,
  setup: FeatureSetup<F, State, Actions>,
): () => Feature<F, State, Actions, ID> {
  const feature = setup(id) as Feature<F, State, Actions, ID>

  feature.id = id

  features.value[id] = feature

  feature.addEventListener = (
    event: string,
    listener: FeatureEventListener,
  ) => {
    listeners.value[id] ??= {}
    listeners.value[id][event] ??= new Set()
    listeners.value[id][event].add(listener)
  }

  feature.removeEventListener = (
    event: string,
    listener: FeatureEventListener,
  ) => {
    listeners.value[id]?.[event].delete(listener)
  }

  const originalUseStore = feature.useStore
  feature.useStore = originalUseStore
    ? () => reactive(originalUseStore() as object) as State & Actions
    : undefined

  return () => feature
}
