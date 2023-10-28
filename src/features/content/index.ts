import type {
  ContentModifierOptions,
  ContentModifierState,
  ContentViewState,
} from '@/features/content/types'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'
import { mdiTextBox } from '@mdi/js'
import { computed, readonly, ref } from 'vue'
import { useControlFeature } from '../control'
import { useCommandFeature } from '@/features/commands'
import { useContentCommands } from '@/features/content/hooks/useContentCommands'
import { watchOnce } from '@vueuse/core'

export const useContentFeature = defineFeature('content', (id) => {
  const { use: useView, plugins: views } = usePluggable<ContentViewState>()
  const {
    use: useModifier,
    plugins: modifiers,
    pluginsList: modifiersList,
  } = usePluggable<ContentModifierState, ContentModifierOptions>()

  const content = ref<string | null>(null)
  const contentWidth = ref<number | null>(null)
  const contentHeight = ref<number | null>(null)
  const contentScrollTop = ref<number>(0)
  const contentScrollHeight = ref<number>(0)
  const scrollBy = ref<{ deltaY: number }>({ deltaY: 0 })
  const activeViewId = ref<string>()
  const resetViewId = ref<string>()

  const viewItems = computed(() =>
    Object.values(views.value).map((view) => ({
      id: view.id,
      label: view.state?.name,
      icon: view.icon,
      value: view,
    })),
  )

  watchOnce(viewItems, (items) => {
    if (!resetViewId.value) resetViewId.value = items[0].id
    if (!activeViewId.value) activeViewId.value = resetViewId.value

    useControlFeature().use({
      id,
      type: ControlType.SELECT,
      icon: mdiTextBox,
      defaults: {
        label: 'View mode',
        desc: 'Content display mode',
        value: computed(() => viewItems.value[0].id),
        resetValue: computed(() => viewItems.value[0].id),
        items: viewItems,
      },
      state: {
        value: computed({
          get: () => activeViewId.value ?? viewItems.value[0]?.id,
          set: (value) => (activeViewId.value = value),
        }),
        resetValue: resetViewId.value,
        items: viewItems,
      },
    })
  })

  useCommandFeature().use(id, useContentCommands().commands)

  return {
    useView,
    useModifier,
    persist: false,
    useStore: () => ({
      views: readonly(views),
      modifiers: readonly(modifiers),
      modifiersList: readonly(modifiersList),

      activeViewId,
      content,
      contentWidth,
      contentHeight,
      contentScrollTop,
      contentScrollHeight,
      scrollBy,
      requestToScrollBy(deltaY: number) {
        scrollBy.value = { deltaY }
      },
    }),
  }
})
