import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import BgColorIcon from '@/features/bg-color/BgColorIcon.vue'

export const useBgColorFeature = defineFeature('bg-color', (id) => {
  const value = ref(null)
  const label = 'Background Color'
  const desc = 'Content\'s background color'

  useControlFeature().use({
    id,
    type: ControlType.COLOR,
    defaults: {
      label,
      desc,
      value: null,
      resetValue: null,
    },
    state: {
      value,
    },
    components: {
      icon: () => BgColorIcon,
    },
  })

  useContentFeature().useModifier({
    id,
    defaults: {
      name: label,
    },
    styles: {
      backgroundColor: computed(() => value.value ?? 'var(--color-base-00)'),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
