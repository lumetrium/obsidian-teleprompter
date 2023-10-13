<template>
  <v-color-picker
    ref="picker"
    v-model:mode="state.mode"
    :model-value="value"
    width="100%"
    elevation="0"
    :swatches="[presets]"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import type { ControlColorState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'
import { ref, toRefs } from 'vue'

const { state } = useControlStore<ControlColorState>()
const { value, presets } = toRefs(state.value)

const picker = ref()

function updateValue(color: unknown) {
  const hexa = color.toString()
  if (!value.value && hexa === '#FFFFFF') {
    // with width="100%" it emits #FFFFFF first time after opening for no reason
    // vuetify 3.3.5
  } else {
    value.value = hexa
  }
}
</script>

<style scoped lang="scss">
.v-color-picker {
  :deep(.v-color-picker-preview:last-child) {
    margin-bottom: 0;
  }
}
</style>
