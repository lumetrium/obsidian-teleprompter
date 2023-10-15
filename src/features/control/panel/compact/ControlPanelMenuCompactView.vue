<template>
  <ControlMenu
    :title="state.label"
    :location="menuLocation"
    :transition="menuTransition"
    @reset="reset"
  >
    <template #icon>
      <ControlIcon />
    </template>
    <ControlView />
  </ControlMenu>
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import ControlMenu from '@/features/control/elements/ControlMenu.vue'
import { useControlStore } from '@/features/control/store/control.store'
import ControlView from '@/features/control/views/ControlView.vue'
import {usePanelStore} from '@/features/panel/store/panel.store'
import type {PluggableControl} from '@/features/control/types'

const { state, reset } = useControlStore()
const { menuLocation, menuTransition } = usePanelStore<PluggableControl>()
</script>
