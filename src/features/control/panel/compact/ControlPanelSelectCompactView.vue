<template>
  <ControlMenu
    close-on-content-click
    hide-actions
    :location="menuLocation"
    :transition="menuTransition"
  >
    <template #icon>
      <ControlIcon />
    </template>
    <template #content>
      <v-card-title class="pt-3">
        {{ state.label }}
      </v-card-title>
      <ControlView />
    </template>
  </ControlMenu>
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import ControlMenu from '@/features/control/elements/ControlMenu.vue'
import type { ControlType } from '@/features/control/enums'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlStateType, PluggableControl } from '@/features/control/types'
import ControlView from '@/features/control/views/ControlView.vue'
import { usePanelStore } from '@/features/panel/store/panel.store'

type SupportedControlTypes = typeof ControlType.SELECT
type State = ControlStateType<SupportedControlTypes>

const { state } = useControlStore<State>()
const { menuLocation, menuTransition } = usePanelStore<PluggableControl>()
</script>
