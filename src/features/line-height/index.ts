import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import { mdiFormatLineHeight } from '@mdi/js'

export const useLineHeightFeature = defineFeature('line-height', (id) => {
  const value = ref(1.2)
  const label = 'Line height'
  const desc = 'Space between the lines'

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    icon: mdiFormatLineHeight,
    defaults: {
      label,
        desc,
      value: value.value,
      resetValue: value.value,
      min: 0.7,
      max: 5,
      step: 0.1
    },
    state: {
      value,
    },
  })

  useContentFeature().useModifier({
    id,
    defaults: {
      name: label,
    },
    styles: {
      lineHeight: computed(() => value.value + 'em'),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
