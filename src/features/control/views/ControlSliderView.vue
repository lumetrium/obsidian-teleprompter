<template>
  <RangeInput
    v-model="value"
    hide-reset
    :min="min"
    :max="max"
    :step="step"
  />
</template>

<script setup lang="ts">
import RangeInput from '@/components/RangeInput.vue'
import type { ControlSliderState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'
import { toRefs, watch } from 'vue'

const { state } = useControlStore<ControlSliderState>()
const { value, min, max, step } = toRefs(state.value)
</script>
