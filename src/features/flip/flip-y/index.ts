import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import FlipYIcon from '@/features/flip/FlipYIcon.vue'

export const useFlipYFeature = defineFeature('flip-y', (id) => {
  const value = ref(false)

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label: 'Flip Vertically',
      desc: "Reverse the content's orientation along the Y-axis.",
      value: false,
      resetValue: false,
      activeLabel: 'Flipped',
    },
    state: {
      value,
    },
    components: {
      icon: () => FlipYIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
