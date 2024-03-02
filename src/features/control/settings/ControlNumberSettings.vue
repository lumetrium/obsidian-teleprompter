<template>
  <div>
    <SettingField
      v-model="state.value"
      label="Value"
      desc="Current value"
      type="number"
    />

    <SettingField
      v-model="state.resetValue"
      label="Reset value"
      desc="Value that will be applied when you reset it"
      type="number"
    />

    <SettingField
      v-model="state.min"
      label="Minimum"
      desc="Lowest possible value"
      type="number"
    />

    <SettingField
      v-model="state.max"
      label="Maximum"
      desc="Highest possible value"
      type="number"
    />

    <SettingField
      v-model="state.step"
      label="Step"
      desc="How much the value will increase/decrease at a time"
      type="number"
    />

    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ControlSliderState } from '@/features/control/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'
import { useControlStore } from '@/features/control/store/control.store'

const { state } = useControlStore<ControlSliderState>()
</script>
