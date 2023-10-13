import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import { mdiFormatSize } from '@mdi/js'

export const useFontSizeFeature = defineFeature('font-size', (id) => {
  const value = ref(60)
  const label = 'Font Size'
  const desc = 'Size of the text'

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    icon: mdiFormatSize,
    defaults: {
      label,
      desc,
      value: value.value,
      resetValue: value.value,
      min: 1,
      max: 200,
      step: 1,
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
      fontSize: computed(() => value.value + 'px'),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
