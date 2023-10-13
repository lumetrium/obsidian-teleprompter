import { defineFeature } from '@/features/feature'
import { useSettingsFeature } from '@/features/settings'
import { mdiInformation } from '@mdi/js'
import About from '@/features/about/About.vue'

export const useAboutFeature = defineFeature('about', (id) => {
  useSettingsFeature().use({
    id,
    tab: { name: 'About', priority: 99999 },
    icon: mdiInformation,
    defaults: {
      name: 'About'
    },
    components: {
      layout: () => About,
    },
  })

  return {}
})
