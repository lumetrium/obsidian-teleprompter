import type { PanelAlignment, PanelLocation } from '@/features/panel/constants'
import type {
  Pluggable,
  PluggableMap,
  PluggableOptions,
} from '@/hooks/usePluggable/types'
import type { MaybeRef } from 'vue'

export type PanelLocationType =
  (typeof PanelLocation)[keyof typeof PanelLocation]

export type PanelAlignType =
  (typeof PanelAlignment)[keyof typeof PanelAlignment]

export interface PanelHandle {
  width: string
  color: string
  hoverColor: string
}

export interface PanelState<ItemState = unknown, Data = unknown> {
  name: string
  location: PanelLocationType
  isOpen: boolean
  alignment?: PanelAlignType
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  index?: number
  handle?: PanelHandle
  items?: ItemState[]
  icon?: string
  data?: Data,
}

export interface PanelOptions<
  ItemState = unknown,
  Data = unknown,
  T extends PanelState<ItemState, Data> = PanelState<ItemState, Data>,
> extends PluggableOptions<T> {
  plugins?: MaybeRef<PluggableMap>
  locations?: MaybeRef<PanelLocationType[]>
  alignments?: MaybeRef<PanelAlignType[]>
}

export type PluggablePanel<ItemState = unknown, Data = unknown> = Pluggable<
  PanelState<ItemState, Data>,
  PanelOptions<ItemState, Data>
>
