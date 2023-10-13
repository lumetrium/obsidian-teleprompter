import type { ControlType } from '@/features/control/enums'
import type { Pluggable, PluggableOptions } from '@/hooks/usePluggable/types'

export interface ControlOptions<T extends ControlTypeType = ControlTypeType>
  extends PluggableOptions<ControlStateType<T>> {
  type?: T
}

export type ControlTypeType = (typeof ControlType)[keyof typeof ControlType]

export type ControlTypeStates = {
  [ControlType.NUMBER]: ControlNumberState
  [ControlType.SLIDER]: ControlSliderState
  [ControlType.SELECT]: ControlSelectState
  [ControlType.TOGGLE]: ControlToggleState
  [ControlType.COLOR]: ControlColorState
  [ControlType.TEXT]: ControlTextState
  [ControlType.DIALOG]: ControlDialogState
  [ControlType.ACTION]: ControlActionState
  [ControlType.MULTI_SLIDER]: ControlMultiSliderState
}

export type ControlStateType<T extends ControlTypeType = ControlTypeType> =
  ControlTypeStates[T]

export interface ControlState<T = ControlStateType> {
  label: string
  desc?: string
  value?: T
  resetValue?: T
  isDetailedView?: boolean
}

export interface ControlNumberState extends ControlState<number> {
  min: number
  max: number
  step: number
}
export interface ControlSliderState extends ControlNumberState {}
export interface ControlSelectState<T = unknown> extends ControlState<T> {
  items: { id: string; label: string; value?: T; icon?: string }[]
}

export interface ControlToggleState extends ControlState<boolean> {
  activeLabel?: string
  inactiveLabel?: string
  highlightColor?: string
}

export interface ControlTextState extends ControlState<string> {
  minLength?: number
  maxLength?: number
}

export interface ControlColorState extends ControlState<string> {
  presets?: string[]
  mode?: 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'
}

export interface ControlDialogState extends ControlState<undefined> {}

export interface ControlActionState extends ControlState<number> {}

export interface ControlMultiSliderState<T extends number[] = number[]>
  extends ControlState<T> {
  min: T
  max: T
  step: T
  labels: { [P in keyof T]: string }
  icons?: { [P in keyof T]: string }
  units?: string
}

export type PluggableControl<T extends ControlTypeType = ControlTypeType> =
  Pluggable<ControlStateType<T>, ControlOptions<T>>
