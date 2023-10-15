import { useSettingStore } from '@/features/settings/store/setting.store'
import type { SettingItem } from '@/features/settings/types'
import { createInjectionState } from '@/utils/createInjectionState'
import { computed, isRef, type Ref, unref, type WritableComputedRef } from 'vue'
import type { Modify } from '@/utils/utility-types'
import { usePluggableUtils } from '@/hooks/usePluggable/usePluggableUtils'

type TypedSettingItemStore<State, T> = Modify<
  ReturnType<typeof useDefaultSettingItemStore>,
  { state: WritableComputedRef<State>; target: WritableComputedRef<T> }
>
const [useProvideSettingItemStore, useDefaultSettingItemStore] =
  createInjectionState((itemRef: Ref<SettingItem>) => {
    const settingStore = useSettingStore()
    const item = unref(itemRef)

    const { extendState } = usePluggableUtils()

    return {
      item: itemRef,
      id: item.id,
      icon: item.icon,
      components: item.components,
      name: computed(() => itemRef.value.name),
      target: computed(() => unref(itemRef.value.target)),
      index: computed(() => settingStore.items.value.indexOf(item)),
      isEnabled: computed({
        get: () => unref(itemRef.value.isEnabled),
        set: (value) => {
          if (isRef(itemRef.value.isEnabled))
            itemRef.value.isEnabled.value = value
          else itemRef.value.isEnabled = value
        },
      }),
      state: computed({
        get: () => itemRef.value.state,
        set: (value) => (itemRef.value.state = value),
      }),
      reset() {
        if (settingStore.setting.value.restoreItemDefaults) {
          settingStore.setting.value.restoreItemDefaults(item)
        } else {
          extendState(itemRef.value.state, itemRef.value.defaults)
        }
      },
    }
  })

function useSettingItemStore<State = unknown, Target = unknown>() {
  return useDefaultSettingItemStore() as TypedSettingItemStore<State, Target>
}

export { useProvideSettingItemStore, useSettingItemStore }
