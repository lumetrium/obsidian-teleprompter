import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import { mdiDockWindow } from '@mdi/js/commonjs/mdi'

export const useDetachWindowFeature = defineFeature('detach-window', (id) => {
  const value = ref(false)
  const label = 'Detach window'
  const desc = 'Move the view to a new window'

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    icon: mdiDockWindow,
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
