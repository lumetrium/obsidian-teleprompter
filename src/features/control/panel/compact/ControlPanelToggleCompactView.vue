<template>
  <v-btn
    icon
    :variant="state.value ? 'tonal' : 'text'"
    @click="control.state.value = !control.state.value"
  >
    <ControlIcon />
  </v-btn>
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlToggleState } from '@/features/control/types'

const { control, state } = useControlStore<ControlToggleState>()
</script>
