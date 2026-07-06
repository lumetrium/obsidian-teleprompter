<template>
  <ColorPicker
    v-model:mode="state.mode"
    :model-value="value"
    elevation="0"
    :swatches="[presets]"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import ColorPicker from '@/components/ColorPicker.vue'
import type { ControlColorState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'
import { toRefs } from 'vue'

const { state } = useControlStore<ControlColorState>()
const { value, presets } = toRefs(state.value)

function updateValue(color: unknown) {
  const hexa = color.toString()
  value.value = hexa
}

</script>
