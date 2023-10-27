import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import FullscreenIcon from '@/features/fullscreen/FullscreenIcon.vue'

export const useFullscreenFeature = defineFeature('fullscreen', (id) => {
  const value = ref(false)
  const label = 'Full-screen'
  const desc = 'Maximize the view'

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label,
      desc,
      value: value.value,
      activeLabel: 'Active',
      inactiveLabel: '',
    },
    state: {
      value,
    },
    components: {
      icon: () => FullscreenIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
