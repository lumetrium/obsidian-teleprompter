import ContentPlain from '@/features/content-plain/ContentPlain.vue'
import { defineFeature } from '@/features/feature'
import { useContentFeature } from '@/features/content'
import { mdiAlphabeticalVariant } from '@mdi/js'

export const useContentPlainFeature = defineFeature('content-plain', (id) => {
  useContentFeature().useView({
    id,
    icon: mdiAlphabeticalVariant,
    defaults: {
      name: 'Plain text',
    },
    components: {
      content: () => ContentPlain,
    },
  })

  return {}
})
