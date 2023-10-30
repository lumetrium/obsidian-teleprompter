import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import {computed, ref} from 'vue'
import OpacityIcon from '@/features/opacity/OpacityIcon.vue'
import {usePlatformFeature} from '@/features/platform'

export const useOpacityFeature = defineFeature('opacity', (id) => {
  const value = ref(100)
  const label = 'Opacity'
  const desc = 'See through the window'

  const platform = usePlatformFeature().useStore()

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    disabled: computed(
      () => platform.isMobile && 'This feature is only available on desktop',
    ),
    defaults: {
      label,
      desc,
      value: value.value,
      resetValue: 100,
      min: 40,
      max: 100,
      step: 1,
    },
    state: {
      value,
    },
    components: {
      icon: () => OpacityIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
