import { ControlType } from '@/features/control/enums'
import ControlSliderView from '@/features/control/views/ControlSliderView.vue'
import ControlSelectView from '@/features/control/views/ControlSelectView.vue'
import ControlTextView from '@/features/control/views/ControlTextView.vue'
import ControlColorView from '@/features/control/views/ControlColorView.vue'
import type { Ref } from 'vue'
import type { PluggableControl } from '@/features/control/types'
import ControlPanelMenuCompactView from '@/features/control/panel/compact/ControlPanelMenuCompactView.vue'
import ControlPanelSelectCompactView from '@/features/control/panel/compact/ControlPanelSelectCompactView.vue'
import ControlPanelToggleCompactView from '@/features/control/panel/compact/ControlPanelToggleCompactView.vue'
import ControlPanelDialogCompactView from '@/features/control/panel/compact/ControlPanelDialogCompactView.vue'
import ControlPanelDefaultCompactView from '@/features/control/panel/compact/ControlPanelDefaultCompactView.vue'
import ControlPanelDefaultView from '@/features/control/panel/normal/ControlPanelDefaultView.vue'
import ControlNumberSettings from '@/features/control/settings/ControlNumberSettings.vue'
import ControlSelectSettings from '@/features/control/settings/ControlSelectSettings.vue'
import ControlMultiSliderView from '@/features/control/views/ControlMultiSliderView.vue'
import ControlPanelToggleView
  from '@/features/control/panel/normal/ControlPanelToggleView.vue'
import ControlPanelSelectView
  from '@/features/control/panel/normal/ControlPanelSelectView.vue'
import ControlToggleSettings
  from '@/features/control/settings/ControlToggleSettings.vue'
import ControlNumbersSettings from '@/features/control/settings/ControlNumbersSettings.vue'
import ControlPanelColorView
	from '@/features/control/panel/normal/ControlPanelColorView.vue'
import ControlPanelMultiSliderView
	from '@/features/control/panel/normal/ControlPanelMultiSliderView.vue'
import ControlPanelActionView
	from '@/features/control/panel/normal/ControlPanelActionView.vue'

export function useControlComponents(control: Ref<PluggableControl>) {
  function getControlView() {
    const customView = control.value.components.content?.()
    if (customView) return customView
    switch (control.value.type) {
      case ControlType.SLIDER:
        return ControlSliderView
      case ControlType.SELECT:
        return ControlSelectView
      case ControlType.TEXT:
        return ControlTextView
      case ControlType.COLOR:
        return ControlColorView
      case ControlType.MULTI_SLIDER:
        return ControlMultiSliderView
      default:
        return undefined
    }
  }

  function getPanelView() {
    switch (control.value.type) {
	    case ControlType.ACTION:
		    return ControlPanelActionView
      case ControlType.SELECT:
        return ControlPanelSelectView
      case ControlType.TOGGLE:
        return ControlPanelToggleView
	    case ControlType.COLOR:
		    return ControlPanelColorView
	    case ControlType.MULTI_SLIDER:
		    return ControlPanelMultiSliderView
      default:
        return ControlPanelDefaultView
    }
  }

  function getPanelCompactView() {
    switch (control.value.type) {
      case ControlType.SLIDER:
        return ControlPanelMenuCompactView
      case ControlType.SELECT:
        return ControlPanelSelectCompactView
      case ControlType.TOGGLE:
        return ControlPanelToggleCompactView
      case ControlType.TEXT:
        return ControlPanelMenuCompactView
      case ControlType.COLOR:
        return ControlPanelMenuCompactView
      case ControlType.DIALOG:
        return ControlPanelDialogCompactView
      case ControlType.MULTI_SLIDER:
        return ControlPanelMenuCompactView
      default:
        return ControlPanelDefaultCompactView
    }
  }

  function getSettingsView() {
    const customView = control.value.components.settings?.()
    if (customView) return customView
    switch (control.value.type) {
      case ControlType.NUMBER:
      case ControlType.SLIDER:
        return ControlNumberSettings
      case ControlType.MULTI_SLIDER:
        return ControlNumbersSettings
      case ControlType.SELECT:
        return ControlSelectSettings
      case ControlType.TOGGLE:
        return ControlToggleSettings
      case ControlType.TEXT:
        return ControlTextView
      case ControlType.COLOR:
        return ControlColorView
      default:
        return undefined
    }
  }

  return {
    getControlView,
    getPanelView,
    getPanelCompactView,
    getSettingsView,
  }
}
