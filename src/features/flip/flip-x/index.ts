import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import FlipXIcon from '@/features/flip/FlipXIcon.vue'

export const useFlipXFeature = defineFeature('flip-x', (id) => {
  const value = ref(false)

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label: 'Flip horizontally',
      desc: "Reverse the content's orientation along the X-axis",
      value: false,
      resetValue: false,
      activeLabel: 'Flipped',
    },
    state: {
      value,
    },
    components: {
      icon: () => FlipXIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
