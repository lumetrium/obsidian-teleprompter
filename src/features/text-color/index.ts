import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import TextColorIcon from '@/features/text-color/TextColorIcon.vue'

export const useTextColorFeature = defineFeature('text-color', (id) => {
  const value = ref(null)
  const label = 'Text color'
  const desc = 'Content\'s text color'

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
      icon: () => TextColorIcon,
    },
  })

  useContentFeature().useModifier({
    id,
    defaults: {
      name: label,
    },
    styles: {
      color: computed(() => value.value ?? 'var(--color-text)'),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
