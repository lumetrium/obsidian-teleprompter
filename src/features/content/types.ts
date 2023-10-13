import type { PluggableMap } from '@/hooks/usePluggable/types'

export interface ContentViewState<T = unknown> {
  name: string
  index?: number
  data?: T
}

export interface ContentModifierState {
  name: string
  index?: number
}

export interface ContentModifierOptions<T = unknown> {
  id: string
  defaults: ContentModifierState
  state: ContentViewState<T>
  styles?: object
  classes?: string[]
  contentStyles?: object
}

export type PluggableContentModifier = PluggableMap<
  ContentModifierState,
  ContentModifierOptions
>
