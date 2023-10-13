import type {
  SettingOptions,
  SettingsTab,
  SettingState,
} from '@/features/settings/types'
import type { PluggableMap } from '@/hooks/usePluggable/types'
import { computed, type Ref } from 'vue'

export function useSettingsTabs(
  plugins: Ref<PluggableMap<SettingState, SettingOptions>>,
) {
  const tabMap = computed<{ [tabId: string]: SettingsTab }>(() => {
    const map: { [tabId: string]: SettingsTab } = {}
    Object.values(plugins.value).forEach((plugin) => {
      const tabConfig =
        typeof plugin.tab === 'object' && 'name' in plugin.tab
          ? plugin.tab
          : undefined
      const tabName = tabConfig?.name || (plugin.tab as string) || 'Other'

      map[tabName] ??= {
        id: tabName,
        name: tabName,
        plugins: [],
        priority: tabConfig?.priority ?? 0,
      }

      map[tabName].plugins.push(plugin)
    })
    return map
  })

  const tabs = computed(() =>
    Object.values(tabMap.value).sort((a, b) => a.priority - b.priority),
  )

  return {
    tabs,
  }
}
