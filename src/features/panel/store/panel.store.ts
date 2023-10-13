import { usePanelFeature } from '@/features/panel'
import type { PanelState, PluggablePanel } from '@/features/panel/types'
import { createInjectionState } from '@/utils/createInjectionState'
import { computed, reactive, type Ref, type WritableComputedRef } from 'vue'
import { PanelLocation } from '@/features/panel/constants'
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

    return {
      panel,
      state,
      ...location,

      getIsCompact,
    }
  },
)

function usePanelStore<Item>() {
  return useDefaultPanelStore() as Modify<
    ReturnType<typeof useDefaultPanelStore>,
    {
      panel: Ref<PluggablePanel<Item>>
      state: WritableComputedRef<PanelState<Item>>
    }
  >
}

export { useProvidePanelStore, usePanelStore }
