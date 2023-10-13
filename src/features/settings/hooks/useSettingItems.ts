import type { Pluggable, PluggableMap } from '@/hooks/usePluggable/types'
import { usePluggableUtils } from '@/hooks/usePluggable/usePluggableUtils'
import { computed, type Ref, unref } from 'vue'
import type { SettingItem } from '@/features/settings/types'
import type { DeepPartial } from '@/utils/utility-types'

export function useSettingItems<P extends Pluggable>(options: {
  source: Ref<P[]>
  plugins: Ref<PluggableMap>
  getDefaultItems: () => P[]
  onAddItem?: (item: P) => P
  customClonePlugin?: (plugin: P, extendWith?: DeepPartial<Pluggable>) => P
}) {
  const clonePlugin =
    options.customClonePlugin ?? usePluggableUtils().clonePlugin
  const { source, plugins, getDefaultItems, onAddItem } = options

  function moveItem(oldIndex: number, newIndex: number) {
    source.value.splice(newIndex, 0, source.value.splice(oldIndex, 1)[0])
  }

  function removeItem(index: number) {
    source.value.splice(index, 1)
  }

  function addItem(id: string) {
    const plugin = plugins.value[id] as P
    if (plugin) {
      source.value.push(onAddItem?.(plugin) ?? (clonePlugin(plugin) as P))
    }
  }

  function restoreDefaults() {
    source.value = getDefaultItems()
  }

  function restoreItemDefaults(item: SettingItem<P['state'], P>) {
    const index = source.value.indexOf(unref(item.target))
    if (index === -1) return
    const target = source.value[index]
    source.value[index] = clonePlugin(target, { state: target.defaults }) as P
  }

  const addableItems = computed(() =>
    Object.values(plugins.value).map((plugin: Pluggable<any>) => ({
      id: plugin.id,
      icon: plugin.state?.icon ?? plugin.icon,
      name: getItemName(plugin) ?? plugin.id,
    })),
  )

  function getItemName(item: Pluggable<any>) {
    const state = item.state
    return state?.name ?? state?.label ?? state?.title
  }

  return {
    restoreDefaults,
    restoreItemDefaults,
    removeItem,
    moveItem,
    addItem,
    addableItems,
  }
}
