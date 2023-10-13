<template>
  <ControlMenu
    close-on-content-click
    hide-actions
    :location="menuLocation"
    :transition="menuTransition"
  >
    <template #activator="{ props }">
      <ControlButton
        v-bind="props"
        :text="selectedItemLabel"
      />
    </template>
    <template #content>
      <ControlView />
    </template>
  </ControlMenu>
</template>

<script setup lang="ts">
import ControlMenu from '@/features/control/elements/ControlMenu.vue'
import type { ControlType } from '@/features/control/enums'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlStateType, PluggableControl } from '@/features/control/types'
import ControlView from '@/features/control/views/ControlView.vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import { computed, unref } from 'vue'
import ControlButton from '@/features/control/elements/ControlButton.vue'

type SupportedControlTypes = typeof ControlType.SELECT
type State = ControlStateType<SupportedControlTypes>

const { state } = useControlStore<State>()
const { menuLocation, menuTransition } = usePanelStore<PluggableControl>()

const items = computed(() => unref((state.value as State)?.items))
const selectedItemLabel = computed(
  () => items.value?.find((item) => item.id === state.value.value)?.label,
)
</script>
