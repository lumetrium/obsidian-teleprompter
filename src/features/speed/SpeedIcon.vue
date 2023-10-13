<template>
  <v-icon
    :icon="icon"
    :class="{ paused: !state.value }"
  />
</template>

<script setup lang="ts">
import type { ControlSliderState } from '@/features/control/types'
import {
  mdiSpeedometer,
  mdiSpeedometerMedium,
  mdiSpeedometerSlow,
} from '@mdi/js'
import { computed } from 'vue'
import { useControlStore } from '@/features/control/store/control.store'

const { state } = useControlStore<ControlSliderState>()

const icon = computed(() => {
  const percentile = state.value.value / state.value.max
  if (percentile > 0.75) return mdiSpeedometer
  if (percentile > 0.25) return mdiSpeedometerMedium
  return mdiSpeedometerSlow
})
</script>

<style scoped lang="scss">
.paused {
  color: var(--text-warning);
}
</style>
