import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import PlayIcon from '@/features/play/PlayIcon.vue'

export const usePlayFeature = defineFeature('play', (id) => {
  const value = ref(false)
  const label = 'Play'
  const desc = 'Toggle auto-scroll'

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label,
      desc,
      value: value.value,
      activeLabel: 'Playing',
      inactiveLabel: 'Paused',
    },
    state: {
      value,
    },
    components: {
      icon: () => PlayIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
