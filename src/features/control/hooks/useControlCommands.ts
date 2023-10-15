import { computed, type Ref, unref } from 'vue'
import type {
  ControlTypeType,
  PluggableControl,
} from '@/features/control/types'
import { ControlType } from '@/features/control/enums'
import { flatten } from 'lodash'
import type { Command } from '@/features/commands/types'

export function useControlCommands(controls: Ref<PluggableControl[]>) {
  const commands = computed(() =>
    flatten(controls.value.map((control) => getCommandsForControl(control))),
  )

  function getCommandsForControl(control: PluggableControl): Command[] {
    if (getIsType(control, ControlType.SLIDER)) {
      return getControlSliderCommands(control)
    }

    if (getIsType(control, ControlType.MULTI_SLIDER)) {
      return getControlMultiSliderCommands(control)
    }

    if (getIsType(control, ControlType.TOGGLE)) {
      return getControlToggleCommands(control)
    }

    if (getIsType(control, ControlType.SELECT)) {
      return getControlSelectCommands(control)
    }

    if (getIsType(control, ControlType.ACTION)) {
      return getControlActionCommands(control)
    }

    return getControlDefaultCommands(control)
  }

  return {
    commands,
  }
}

function getIsType<T extends ControlTypeType>(
  control: PluggableControl,
  type: T,
): control is PluggableControl<T> {
  return control.type === type
}

function getLabel(control: PluggableControl) {
  const label = control.state.label
  const defaultLabel = control.defaults.label
  return label && label !== defaultLabel
    ? `${control.defaults.label} (${label})`
    : defaultLabel
}

export function getControlSliderCommands(
  control: PluggableControl<typeof ControlType.SLIDER>,
): Command[] {
  return [
    {
      id: `control:${control.id}:up`,
      name: `${getLabel(control)} - increase with step ${control.state.step}`,
      callback: () => (control.state.value += control.state.step),
    },
    {
      id: `control:${control.id}:down`,
      name: `${getLabel(control)} - decrease with step ${control.state.step}`,
      callback: () => (control.state.value -= control.state.step),
    },
    {
      id: `control:${control.id}:reset`,
      name: `${getLabel(control)} - reset`,
      callback: () => (control.state.value = control.state.resetValue),
    },
  ]
}

export function getControlMultiSliderCommands(
  control: PluggableControl<typeof ControlType.MULTI_SLIDER>,
): Command[] {
  function getMultiSliderItemLabel(i: number) {
    const label = control.state.labels[i]?.toLowerCase()
    const defaultLabel = control.defaults.labels[i]?.toLowerCase()
    return label && label !== defaultLabel
      ? `${defaultLabel} (${label})`
      : defaultLabel
  }

  return flatten(
    control.state.value.map((item, i) => [
      {
        id: `control:${control.id}:${i}:up`,
        name: `${getLabel(control)} ${getMultiSliderItemLabel(
          i,
        )} - increase with step ${control.state.step[i]}`,
        callback: () => (control.state.value[i] += control.state.step[i]),
      },
      {
        id: `control:${control.id}:${i}:down`,
        name: `${getLabel(control)} ${getMultiSliderItemLabel(
          i,
        )} - decrease with step ${control.state.step[i]}`,
        callback: () => (control.state.value[i] -= control.state.step[i]),
      },
      {
        id: `control:${control.id}:${i}:reset`,
        name: `${getLabel(control)} ${getMultiSliderItemLabel(
          i,
        )} - reset`,
        callback: () => (control.state.value[i] = control.state.resetValue[i]),
      },
    ]),
  )
}

export function getControlToggleCommands(
  control: PluggableControl<typeof ControlType.TOGGLE>,
): Command[] {
  return [
    {
      id: `control:${control.id}:true`,
      name: `${getLabel(control)} - toggle on`,
      callback: () => (control.state.value = true),
    },
    {
      id: `control:${control.id}:false`,
      name: `${getLabel(control)} - toggle off`,
      callback: () => (control.state.value = false),
    },
    {
      id: `control:${control.id}:toggle`,
      name: `${getLabel(control)} - toggle`,
      callback: () => (control.state.value = !control.state.value),
    },
  ]
}

export function getControlActionCommands(
  control: PluggableControl<typeof ControlType.ACTION>,
): Command[] {
  return [
    {
      id: `control:${control.id}:trigger`,
      name: getLabel(control),
      callback: () => (control.state.value = new Date().getTime()),
    },
  ]
}

export function getControlSelectCommands(
  control: PluggableControl<typeof ControlType.SELECT>,
): Command[] {
  return [
    {
      id: `control:${control.id}:reset`,
      name: `${getLabel(control)} - reset`,
      callback: () => (control.state.value = control.state.resetValue),
    },
  ]
}

export function getControlDefaultCommands(
  control: PluggableControl,
): Command[] {
  return [
    {
      id: `control:${control.id}:reset`,
      name: `${getLabel(control)} - reset`,
      callback: () => (control.state.value = control.state.resetValue),
    },
  ]
}
