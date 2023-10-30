import type { Pluggable, PluggableMap } from '@/hooks/usePluggable/types'
import type { DeepPartial } from '@/utils/utility-types'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'
import { nanoid } from 'nanoid'
import { isRef, type MaybeRef, toRaw, unref } from 'vue'

export type PluggableReducedItem<S = unknown> = {
  id: string
  state: DeepPartial<S>
  defaults?: DeepPartial<S>
}
type DeepPartialPlugin<S> = DeepPartial<Pluggable<S>>
type DeepPartialValue<S> = DeepPartial<S>[keyof S]

export function usePluggableUtils() {
  function isPluggable(item: unknown): item is Pluggable {
    return (
      item &&
      typeof item === 'object' &&
      !!(item as Pluggable)?.id &&
      !!(item as Pluggable)?.state &&
      !!(item as Pluggable)?.defaults
    )
  }

  function getDiffs<S>(state: S, defaults: S): Partial<S> {
    return Object.entries(state).reduce((acc, entry) => {
      const key = entry[0] as keyof S
      const value = unref(entry[1] as S[typeof key])
      if (!isEqual(value, unref(defaults[key]))) acc[key] = value
      return acc
    }, {} as Partial<S>)
  }

  function getDiffsDeep<S>(state: S, defaults?: S): DeepPartial<S> {
    return Object.entries(state).reduce((acc, entry) => {
      const key = entry[0] as keyof S
      const value = unref(entry[1]) as DeepPartialValue<S>
      const defaultValue = unref(defaults?.[key]) as DeepPartialValue<S>

      if (isPluggable(value)) {
        const diffs = getDiffsDeep(value.state, defaultValue ?? value.defaults)
        if (!isEmpty(diffs)) acc[key] = diffs as DeepPartialValue<S>
      } else if (Array.isArray(value) && isPluggable(value.at(0))) {
        acc[key] = getPluggableDiffsArray(
          value,
          Array.isArray(defaultValue) ? defaultValue : undefined,
        ) as DeepPartialValue<S>
      } else if (isPlainObject(value)) {
        const diffs = getDiffsDeep(value, defaultValue)
        if (!isEmpty(diffs)) acc[key] = diffs as DeepPartialValue<S>
      } else if (!isEqual(value, defaultValue)) {
        acc[key] = value
      }
      return acc
    }, {} as DeepPartial<S>)
  }

  function getPluggableDiffsArray<S>(
    arr: Pluggable<S>[],
    defaults?: S[] | Pluggable<S>[],
  ): PluggableReducedItem<S>[] {
    return arr.map((plugin: Pluggable<S>, i) => {
      const defaultState = isPluggable(defaults?.[i])
        ? (defaults[i] as Pluggable<S>).defaults
        : (defaults?.[i] as S)
      return {
        id: plugin.id,
        state: getDiffsDeep(plugin.state, defaultState ?? plugin.defaults),
        defaults: defaultState
          ? getDiffsDeep(plugin.defaults, defaultState)
          : undefined,
      }
    })
  }

  function extendPluginsState<
    S,
    Plugins extends Pluggable<S[]> | PluggableMap<S>,
  >(
    plugins: MaybeRef<Plugins>,
    states: Record<string, DeepPartial<S>>,
  ): Plugins {
    plugins = unref(plugins)
    const list = Array.isArray(plugins) ? plugins : Object.values(plugins)
    for (const plugin of list) merge(plugin.state, states?.[plugin.id])
    return plugins
  }

  function mergeArrayWithPlugins<S>(
    arr: PluggableReducedItem<S>[],
    plugins: MaybeRef<PluggableMap<S>>,
    mergeFn: typeof clonePlugin<S> = clonePlugin,
  ): Pluggable<S>[] {
    return arr.reduce((acc, item) => {
      const plugin = unref(unref(plugins)[item.id])
      if (plugin) acc.push(mergeFn(plugin, item))
      return acc
    }, [])
  }

  function clonePlugin<S>(
    plugin: Pluggable<S>,
    extendWith?: DeepPartialPlugin<S>,
  ): Pluggable<S> {
    const clone = merge({}, extendWith, toRaw(plugin)) as Pluggable<S>
    clone.key = nanoid()
    extendState(clone.state, plugin.state, extendWith?.state)
    extendState(clone.defaults, plugin.defaults, extendWith?.defaults)
    return clone
  }

  function extendState<S>(
    target: S,
    source: S,
    extendWith?: DeepPartial<S>,
  ): void {
    const rawState = toRaw(source)
    Object.entries(target).forEach((entry) => {
      const [key, value] = entry as [keyof S, unknown]
      const sourceStateValue = rawState[key]
      const extendWithValue = (extendWith as S)?.[key]

      if (isRef(sourceStateValue)) {
        target[key] = sourceStateValue
      } else if (typeof value === 'object') {
        merge(value, sourceStateValue, extendWithValue)
      } else if (
        extendWithValue !== undefined ||
        sourceStateValue !== undefined
      ) {
        target[key] = extendWithValue ?? sourceStateValue
      }
    })
  }

  function getClonePluginCustom<P extends Pluggable>(
    apply: (clone: P, plugin: P, extendWith?: P) => void,
  ) {
    return (plugin: P, extendWith?: DeepPartial<P>) => {
      const clone = clonePlugin(plugin, extendWith) as P
      apply(clone, plugin, extendWith as P)
      return clone
    }
  }

  function applyDefaults<Plugins extends Pluggable[] | PluggableMap>(
    plugins: MaybeRef<Plugins>,
  ): Plugins {
    plugins = unref(plugins)
    const list = Array.isArray(plugins) ? plugins : Object.values(plugins)
    for (const plugin of list) extendState(plugin.state, plugin.defaults)
    return plugins
  }

  return {
    isPluggable,
    getDiffs,
    getDiffsDeep,
    getPluggableDiffsArray,
    applyDefaults,
    extendPluginsState,
    mergeArrayWithPlugins,
    clonePlugin,
    getClonePluginCustom,
    extendState,
  }
}
