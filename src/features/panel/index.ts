import { defineFeature } from '@/features/feature'
import PanelSettings from '@/features/panel/components/PanelSettings.vue'
import type {
  PanelOptions,
  PanelState,
  PluggablePanel,
} from '@/features/panel/types'
import { useSettingItems } from '@/features/settings/hooks/useSettingItems'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'
import { defaultTo } from '@/utils/defaultTo'
import { mdiPageLayoutHeaderFooter } from '@mdi/js'
import { computed, type Ref, ref, unref } from 'vue'
import { useSettingsFeature } from '../settings'
import PanelIcon from '@/features/panel/components/PanelIcon.vue'
import PanelItemIcon from '@/features/panel/components/PanelSettingIcon.vue'
import type { PluggableReducedItem } from '@/hooks/usePluggable/usePluggableUtils'
import { genUniqueName } from '@/utils/genUniqueName'
import { createStateAccessor } from '@/utils/createStateAccessor/createStateAccessor'

export const usePanelFeature = defineFeature('panel', (id) => {
  const {
    use,
    plugins,
    getPluginComponent,
    getDiffsDeep,
    getClonePluginCustom,
    mergeArrayWithPlugins,
    getPluginById,
  } = usePluggable<PanelState, PanelOptions>()

  const panels = ref([]) as Ref<PluggablePanel[]>

  const getPanelFromPlugin = getClonePluginCustom<PluggablePanel>(
    (clone, plugin, extendWith) => {
      const items = unref(extendWith?.state?.items) ?? unref(clone.state.items)
      clone.state.items = plugin.plugins
        ? mergeArrayWithPlugins(
            (items ?? []) as PluggableReducedItem[],
            plugin.plugins,
          )
        : (items ?? [])
    },
  )

  const defaultPanelsAccessor = createStateAccessor<PluggablePanel[]>([], {
    onGet: (value) => value.map((plugin) => getPanelFromPlugin(plugin)),
    onSet: (value) => {
      if (!panels.value.length) panels.value = defaultPanelsAccessor.get()
    },
  })

  useSettingsFeature().use({
    id,
    tab: 'Panels',
    icon: mdiPageLayoutHeaderFooter,
    defaults: {
      name: 'Panels',
      items: [],
    },
    state: {
      name: 'Panels',
      items: computed(() =>
        panels.value.map((item, i) => ({
          id: `${item.id}:${item.key}`,
          name: item.state.name,
          icon: item.state.icon,
          state: item.state,
          defaults: item.defaults,
          target: item,
          isEnabled: computed({
            get: () => item.state.isOpen,
            set: (value) => (item.state.isOpen = value),
          }),
          components: {
            content: () => PanelSettings,
            settings: getPluginComponent(item.id, 'settings'),
            icon: () => PanelItemIcon,
          },
        })),
      ),
    },
    components: {
      content: () => PanelSettings,
      icon: () => PanelIcon,
    },
    ...useSettingItems({
      plugins,
      source: panels,
      customClonePlugin: getPanelFromPlugin,
      getDefaultItems: defaultPanelsAccessor.get,
      onAddItem: (plugin) => {
        return getPanelFromPlugin(plugin, {
          state: {
            name: genUniqueName(
              plugin.state.name,
              panels.value.map(({ state }) => state.name),
            ),
          },
        })
      },
    }),
  })

  return {
    use,
    useStore: () => ({
      plugins,
      panels,
      getPanelFromPlugin,
      setDefaultPanels: defaultPanelsAccessor.set,
    }),
    persist: {
      reduce: (state) =>
        getDiffsDeep(
          { panels },
          {
            panels: panels.value.map(({ id }) => getPluginById(id)),
          },
        ),
      merge: (state, savedState) => ({
        panels: defaultTo(
          () =>
            mergeArrayWithPlugins(
              savedState?.panels,
              plugins.value,
              getPanelFromPlugin,
            ),
          [],
        ),
      }),
    },
  }
})
