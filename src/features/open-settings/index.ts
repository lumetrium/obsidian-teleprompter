import { useControlFeature } from '@/features/control'
import { defineFeature, defineFeatureEmits } from '@/features/feature'
import { mdiCog } from '@mdi/js'
import { ref, watch } from 'vue'
import { ControlType } from '@/features/control/enums'

export const useOpenSettingsFeature = defineFeature('open-settings', (id) => {
  const emit = defineFeatureEmits(id, ['click'])
  const value = ref()

  watch(value, () => emit('click'))

  useControlFeature().use({
    id,
    icon: mdiCog,
    type: ControlType.ACTION,
    defaults: {
      label: 'Open Settings',
      desc: 'Open plugin\'s tab in Obsidian settings',
    },
    state: {
      value,
    },
  })

  return {}
})
