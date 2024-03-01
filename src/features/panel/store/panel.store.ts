import { usePanelFeature } from '@/features/panel'
import type { PanelState, PluggablePanel } from '@/features/panel/types'
import { createInjectionState } from '@/utils/createInjectionState'
import { computed, type Ref, type WritableComputedRef } from 'vue'
import type { Modify } from '@/utils/utility-types'
import { usePanelLocation } from '@/features/panel/hooks/usePanelLocation'

const [useProvidePanelStore, useDefaultPanelStore] = createInjectionState(
  (panel: Ref<PluggablePanel>) => {
    const store = usePanelFeature().useStore()
    const state = computed({
      get: () => panel.value.state,
      set: (value) => (panel.value.state = value),
    })

    const location = usePanelLocation(computed(() => state.value.location))

    function getIsCompact(options: { width?: number; height?: number }) {
      const { width, height } = options
      const { isHorizontal, isVertical } = location
      return (
        (isHorizontal.value && height && state.value.height < height) ||
        (isVertical.value && width && state.value.width < width)
      )
    }

    function patchState(partialState: Partial<PanelState>) {
      state.value = { ...state.value, ...partialState }
    }

    return {
      panel,
      state,
      ...location,

      getIsCompact,
      patchState,
    }
  },
)

function usePanelStore<Item, Data = unknown>() {
  return useDefaultPanelStore() as Modify<
    ReturnType<typeof useDefaultPanelStore>,
    {
      panel: Ref<PluggablePanel<Item, Data>>
      state: WritableComputedRef<PanelState<Item, Data>>
    }
  >
}

export { useProvidePanelStore, usePanelStore }
