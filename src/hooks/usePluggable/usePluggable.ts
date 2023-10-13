import type {
  Pluggable,
  PluggableComponents,
  PluggableMap,
  PluggableOptions,
  PluggableSetup,
} from '@/hooks/usePluggable/types'
import { usePluggableUtils } from '@/hooks/usePluggable/usePluggableUtils'
import cloneDeep from 'lodash/cloneDeep'
import { nanoid } from 'nanoid'
import { type Component, computed, readonly, ref } from 'vue'

export function usePluggable<
  S extends object,
  O extends PluggableOptions<S> = PluggableOptions<S>,
>() {
  const plugins = ref<PluggableMap<S, O>>({})
  const pluggableUtils = usePluggableUtils()

  const pluginsList = computed(() => Object.values(plugins.value))

  function use(pluginSetup: PluggableSetup<S, O>): Pluggable<S, O> {
    const plugin = {
      components: {},
      ...(pluginSetup as Pluggable<S, O>),
      key: nanoid(),
      defaults: readonly(pluginSetup.defaults),
      state: {
        ...cloneDeep(pluginSetup.defaults),
        ...(pluginSetup.state ?? {}),
      },
    }
    plugins.value[plugin.id] = plugin
    return plugin
  }

  function getPluginById(id: string): Pluggable<S, O> | undefined {
    return plugins.value[id]
  }

  function getPluginComponent(
    pluginId: string,
    componentName: keyof PluggableComponents,
    defaultComponent?: () => Component<S>,
  ): () => Component<S> {
    const components = getPluginById(pluginId)?.components
    return components?.[componentName] ?? defaultComponent
  }

  return {
    use,
    plugins,
    pluginsList,
    getPluginById,
    getPluginComponent,
    ...pluggableUtils,
  }
}
