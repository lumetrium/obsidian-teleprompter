import { defineFeature } from '@/features/feature'
import { useSettingsTabs } from '@/features/settings/hooks/useSettingsTabs'
import type { SettingOptions, SettingState } from '@/features/settings/types'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'

export const useSettingsFeature = defineFeature('settings', (id) => {
  const { use, plugins } = usePluggable<SettingState, SettingOptions>()
  const { tabs } = useSettingsTabs(plugins)

  return {
    use,
    persist: false,
    useStore: () => ({
      plugins,
      tabs,
    }),
  }
})
