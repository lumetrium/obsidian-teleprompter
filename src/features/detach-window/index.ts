import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { mdiDockWindow } from '@mdi/js/commonjs/mdi'
import { usePlatformFeature } from '@/features/platform'

export const useDetachWindowFeature = defineFeature('detach-window', (id) => {
  const value = ref(false)
  const label = 'Detach window'
  const desc = 'Move the view to a new window'

  const platform = usePlatformFeature().useStore()

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    icon: mdiDockWindow,
    disabled: computed(
      () => platform.isMobile && 'This feature is only available on desktop',
    ),
    defaults: {
      label,
      desc,
      value: value.value,
      activeLabel: 'Detached',
      inactiveLabel: '',
    },
    state: {
      value,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
