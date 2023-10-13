import { defineFeature } from '@/features/feature'
import Pagemap from '@/features/pagemap/PagemapView.vue'
import { mdiGlassStange } from '@mdi/js'
import { usePanelFeature } from '@/features/panel'
import { PanelLocation } from '@/features/panel/constants'

export const usePagemapFeature = defineFeature('pagemap', (id) => {

  usePanelFeature().use({
    id,
    locations: [PanelLocation.RIGHT, PanelLocation.LEFT],
    defaults: {
      name: 'Page Minimap',
      location: PanelLocation.RIGHT,
      isOpen: true,
      icon: mdiGlassStange,
      width: 156,
      minWidth: 15,
    },
    components: {
      content: () => Pagemap,
    },
  })

  return {}
})
