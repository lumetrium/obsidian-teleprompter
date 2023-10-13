import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import SpeedIcon from '@/features/speed/SpeedIcon.vue'
import { ref } from 'vue'

export const useSpeedFeature = defineFeature('speed', (id) => {
  const value = ref(18)
  const label = 'Speed'
  const desc = 'Speed of the scroll'

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    defaults: {
      label,
      desc,
      value: value.value,
      resetValue: 18,
      min: 0,
      max: 50,
      step: 1,
    },
    state: {
      value,
    },
    components: {
      icon: () => SpeedIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
