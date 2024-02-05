import { defineFeature } from '@/features/feature'
import Eyeline from '@/features/eyeline/EyelineView.vue'
import { mdiPlay } from '@mdi/js'
import { usePanelFeature } from '@/features/panel'
import { PanelLocation } from '@/features/panel/constants'
import type { EyelineIndicator } from '@/features/eyeline/types'
import EyelineSettings from '@/features/eyeline/EyelineSettings.vue'

export const useEyelineFeature = defineFeature('eyeline', (id) => {
  const indicators: EyelineIndicator[] = [
    {
      top: 20,
      color: '',
    },
  ]

  usePanelFeature().use({
    id,
    locations: [PanelLocation.RIGHT, PanelLocation.LEFT],
    alignments: [],
    defaults: {
      name: 'Eyeline indicator',
      location: PanelLocation.LEFT,
      isOpen: true,
      icon: mdiPlay,
      width: 65,
      minWidth: 15,
      items: indicators,
    },
    components: {
      content: () => Eyeline,
      settings: () => EyelineSettings,
    },
  })

  return {
    useStore: () => ({}),
    persist: false,
  }
})
