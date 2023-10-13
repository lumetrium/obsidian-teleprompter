import type {
  Pluggable,
  PluggableComponents,
  PluggableMap,
  PluggableOptions,
} from '@/hooks/usePluggable/types'
import type { MaybeRef } from 'vue'

export interface SettingState<T = unknown> {
  name: string
  desc?: string
  items: SettingItem<T>[]
}

export interface SettingItem<T = unknown, Target = unknown> {
  id: string
  name: string
  desc?: string
  icon?: string
  isEnabled?: MaybeRef<boolean>
  state?: T
  defaults?: T
  components?: PluggableComponents
  target?: MaybeRef<Target>
}

export interface SettingAddableItem {
  id: string
  name: string
  icon?: string
}

export interface SettingOptions<S extends SettingState = SettingState>
  extends PluggableOptions<S> {
  tab?: string | { name: string, priority: number }
  addableItems?: MaybeRef<SettingAddableItem[]>
  addItem?: (id: string) => void
  removeItem?: (index: number) => void
  moveItem?: (oldIndex: number, newIndex: number) => void
  restoreDefaults?: () => void
  restoreItemDefaults?: (item: SettingItem) => void
}

export type SettingPluggable<S extends SettingState = SettingState> = Pluggable<
  S,
  SettingOptions<S>
>

export interface SettingsFeatureState {
  plugins: PluggableMap<any>
}

export interface SettingsTab {
  id: string
  name: string
  desc?: string
  plugins: SettingPluggable[]
  icon?: string
  priority?: number
}
