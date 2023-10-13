<template>
  <ControlButton
    :variant="state.value ? 'tonal' : 'text'"
    :text="stateLabel"
    @click="state.value = !state.value"
  />
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlToggleState } from '@/features/control/types'
import ControlButton from '@/features/control/elements/ControlButton.vue'
import { computed } from 'vue'

const { state } = useControlStore<ControlToggleState>()

const stateLabel = computed(() =>
  state.value.value ? state.value.activeLabel : state.value.inactiveLabel,
)
</script>