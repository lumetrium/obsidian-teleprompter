import { defineFeature } from '@/features/feature'
import { computed } from 'vue'
import { useContentFeature } from '@/features/content'
import { useFlipXFeature } from '@/features/flip/flip-x'
import { useFlipYFeature } from '@/features/flip/flip-y'

export const useFlipFeature = defineFeature('flip', (id) => {
  const flipX = useFlipXFeature().useStore()
  const flipY = useFlipYFeature().useStore()

  useContentFeature().useModifier({
    id,
    defaults: {
      name: 'Flip',
    },
    styles: {
      scale: computed(() => (flipX.value ? -1 : 1) + ' ' + (flipY.value ? -1 : 1)),
    },
  })

  return {}
})
