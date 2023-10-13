import type { Modify } from '@/utils/utility-types'
import type { Component, MaybeRef } from 'vue'

export interface PluggableOptions<State> {
  id: string
  icon?: string
  defaults: State
  state: State
}
export interface PluggableComponents<T = any> {
  icon?: () => Component<T>
  content?: () => Component<T>
  settings?: () => Component<T>
  layout?: () => Component
}

export type Pluggable<
  State = unknown,
  Options extends PluggableOptions<State> = PluggableOptions<State>,
> = Options & {
  /**
   * Used to distinguish between plugins with the same id.
   * For example, if you have two plugins with the same ids but different configurations.
   */
  key?: string
  /**
   * Custom views
   */
  components?: PluggableComponents
}

export type PluggableMap<
  State = unknown,
  Options extends PluggableOptions<State> = PluggableOptions<State>,
> = { [id: string]: Pluggable<State, Options> }

export type PluggableStateMap<State> = { [pluginId: string]: State }

// SETUP

export type PluggableSetup<
  State,
  Options extends PluggableOptions<State> = PluggableOptions<State>,
> = Modify<
  Options,
  {
    state?: { [P in keyof Partial<State>]: MaybeRef<State[P]> }
    defaults?: { [P in keyof Partial<State>]: MaybeRef<State[P]> }
  }
> & {
  components?: PluggableComponents
}
