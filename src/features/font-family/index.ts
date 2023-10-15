import { defineFeature } from '@/features/feature'
import { computed, ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { useContentFeature } from '@/features/content'
import { mdiFormatFont } from '@mdi/js'

export const useFontFamilyFeature = defineFeature('font-family', (id) => {
  const DEFAULT_FONT_ID = 'Default'

  const value = ref(DEFAULT_FONT_ID)
  const label = 'Font family'
  const desc = 'Typeface for text elements'

  useControlFeature().use({
    id,
    type: ControlType.SELECT,
    icon: mdiFormatFont,
    defaults: {
      label,
      desc,
      value: DEFAULT_FONT_ID,
      resetValue: DEFAULT_FONT_ID,
      items: computed(() => [
        { label: 'Default', id: DEFAULT_FONT_ID },
        { label: 'Arial', id: 'Arial' },
        { label: 'Courier New', id: 'Courier New' },
        { label: 'Georgia', id: 'Georgia' },
        { label: 'Helvetica', id: 'Helvetica' },
        { label: 'Times New Roman', id: 'Times New Roman' },
        { label: 'Trebuchet MS', id: 'Trebuchet MS' },
        { label: 'Tahoma', id: 'Tahoma' },
        { label: 'Roboto', id: 'Roboto' },
        { label: 'Verdana', id: 'Verdana' },
      ]),
    },
    state: {
      value,
    },
  })

  useContentFeature().useModifier({
    id,
    defaults: {
      name: label,
    },
    styles: {
      fontFamily: computed(() =>
        value.value === DEFAULT_FONT_ID ? 'var(--font-interface)' : value.value,
      ),
    },
  })

  return {
    useStore: () => ({
      value,
    }),
  }
})
