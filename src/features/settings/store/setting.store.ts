import { useSettingsFeature } from '@/features/settings'
import { createInjectionState } from '@/utils/createInjectionState'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { computed, isReadonly, isRef, toRaw, unref } from 'vue'

export const [useProvideSettingStore, useSettingStore] = createInjectionState(
  (id: string) => {
    const store = useSettingsFeature().useStore()
    const setting = computed(() => store.plugins[id])

    return {
      id,
      setting,
      icon: computed(() => setting.value.icon),
      items: computed(() => unref(setting.value.state.items)),
      state: computed({
        get: () => unref(setting).state,
        set: (value) => {
          setting.value.state = value
        },
      }),
      components: computed(() => setting.value.components),
    }
  },
)
