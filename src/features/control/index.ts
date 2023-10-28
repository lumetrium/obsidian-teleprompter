import ControlPanel from '@/features/control/panel/ControlPanel.vue'
import ControlPanelSettings from '@/features/control/settings/ControlPanelSettings.vue'
import type {
  ControlOptions,
  ControlStateType,
  ControlTypeType,
} from '@/features/control/types'
import { defineFeature } from '@/features/feature'
import { usePanelFeature } from '@/features/panel'
import { PanelLocation } from '@/features/panel/constants'
import { useSettingsFeature } from '@/features/settings'
import type { PluggableMap, PluggableSetup } from '@/hooks/usePluggable/types'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'
import { mdiTuneVariant } from '@mdi/js'
import { computed } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import ControlSettings from '@/features/control/settings/ControlSettings.vue'
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import { useCommandFeature } from '@/features/commands'
import { useControlCommands } from '@/features/control/hooks/useControlCommands'

export const useControlFeature = defineFeature('control', (id) => {
  const {
    use,
    plugins,
    pluginsList,
    getDiffsDeep,
    extendPluginsState,
    applyDefaults,
  } = usePluggable<ControlStateType, ControlOptions>()

  const pluginsWithStateAsDefaults = computed<
    PluggableMap<ControlStateType, ControlOptions>
  >(() =>
    Object.values(plugins.value).reduce((acc, plugin) => {
      acc[plugin.id] = {
        ...plugin,
        defaults: cloneDeep(plugin.state),
        state: plugin.state,
      }
      return acc
    }, {} as any),
  )


  usePanelFeature().use({
    id,
    plugins: pluginsWithStateAsDefaults,
    defaults: {
      name: 'Control panel',
      location: PanelLocation.TOP,
      height: 48,
      minHeight: 48,
      width: 200,
      minWidth: 48,
      isOpen: true,
      icon: mdiTuneVariant,
      items: [],
    },
    components: {
      content: () => ControlPanel,
      settings: () => ControlPanelSettings,
    },
  })

  useSettingsFeature().use({
    id,
    tab: 'Controls',
    icon: mdiTuneVariant,
    defaults: {
      name: 'Controls',
      items: computed(() =>
        Object.values(plugins.value)
          .sort((a, b) => a.defaults.label > b.defaults.label ? 1 : -1)
          .map((plugin) => ({
            id: plugin.id,
            name: plugin.defaults.label,
            icon: plugin.icon,
            state: plugin.state,
            defaults: plugin.defaults,
            components: {
              icon: () => ControlIcon,
              content: () => ControlSettings,
            },
          }
        )),
      ),
    },
    restoreDefaults: () => applyDefaults(plugins),
  })

  useCommandFeature().use(id, useControlCommands(pluginsList).commands)

  return {
    use: <T extends ControlTypeType>(
      plugin: PluggableSetup<ControlStateType<T>, ControlOptions<T>>,
    ) => {
      use(plugin)
    },
    useStore: () => ({
      plugins,
      pluginsList,
    }),
    persist: {
      reduce: (state) => getDiffsDeep({ plugins }),
      merge: (state, savedState) => ({
        plugins: extendPluginsState(plugins, savedState?.plugins),
      }),
    },
  }
})
