import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import { mdiFormatLetterSpacing } from '@mdi/js'

export const useLetterSpacingFeature = defineFeature('letter-spacing', (id) => {
  const value = ref(0)
  const label = 'Letter spacing'
  const desc = 'Space between the letters'

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    icon: mdiFormatLetterSpacing,
    defaults: {
      label,
      desc,
      value: value.value,
      resetValue: value.value,
      min: -5,
      max: 10,
      step: 0.05,
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
      letterSpacing: computed(() => value.value + 'px'),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
