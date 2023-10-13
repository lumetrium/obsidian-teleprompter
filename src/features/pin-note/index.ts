import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import PinNoteIcon from '@/features/pin-note/PinNoteIcon.vue'
import { ref } from 'vue'

export const usePinNoteFeature = defineFeature('pin-note', (id) => {
  const value = ref(false)
  const label = 'Pin Note'
  const desc = 'Preserve content when switching focus to other notes'

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label,
      desc,
      value: value.value,
      activeLabel: 'Pinned',
      inactiveLabel: 'Unpinned',
    },
    state: {
      value,
    },
    components: {
      icon: () => PinNoteIcon,
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
