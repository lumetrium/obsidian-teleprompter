import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import {
  mdiDockBottom,
  mdiDockLeft,
  mdiDockRight,
  mdiDockTop,
  mdiFitToPageOutline,
} from '@mdi/js'

export const usePaddingFeature = defineFeature('padding', (id) => {
  const value = ref([50, 5, 50, 5])
  const units = ref('%')
  const label = 'Padding'
  const desc = 'Space around the content'

  useControlFeature().use({
    id,
    icon: mdiFitToPageOutline,
    type: ControlType.MULTI_SLIDER,
    defaults: {
      label,
      desc,
      value: value.value.slice(),
      resetValue: value.value.slice(),
      units: units.value.slice(),
      labels: ['Top', 'Right', 'Bottom', 'Left'],
      min: [0, 0, 0, 0],
      max: [100, 100, 100, 100],
      step: [1, 1, 1, 1],
      icons: [mdiDockTop, mdiDockRight, mdiDockBottom, mdiDockLeft],
    },
    state: {
      value,
      units,
    },
  })

  const contentStore = useContentFeature().useStore()

  function getPixels(index: number, value: number): number {
    return index % 2 === 0
      ? (contentStore.contentHeight * value) / 100
      : (contentStore.contentWidth * value) / 100
  }

  useContentFeature().useModifier({
    id,
    defaults: {
      name: label,
    },
    styles: {},
    contentStyles: {
      padding: computed(() =>
        Array.isArray(value.value)
          ? value.value.reduce(
              (acc, val, i) => acc + `${getPixels(i, val)}px `,
              '',
            )
          : '',
      ),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
