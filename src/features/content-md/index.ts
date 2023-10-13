import { useContentFeature } from '@/features/content'
import ContentMd from '@/features/content-md/ContentMd.vue'
import { defineFeature } from '@/features/feature'
import { mdiLanguageMarkdown } from '@mdi/js'

export const useContentMdFeature = defineFeature('content-md', (id) => {
  useContentFeature().useView({
    id,
    icon: mdiLanguageMarkdown,
    defaults: {
      name: 'Markdown',
    },
    components: {
      content: () => ContentMd,
    },
  })

  return {}
})
