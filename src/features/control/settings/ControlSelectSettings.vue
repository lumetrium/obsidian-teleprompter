<template>
  <div>
    <SettingsField
      label="Value"
      desc="Current value"
    >
      <SelectInput
        v-model="state.value"
        item-title="label"
        item-icon="icon"
        item-value="id"
        :items="items"
      />
    </SettingsField>

    <SettingsField
      label="Reset value"
      desc="Value that will be applied when you reset it"
    >
      <SelectInput
        v-model="state.resetValue"
        item-title="label"
        item-icon="icon"
        item-value="id"
        :items="items"
      />
    </SettingsField>
  </div>
</template>

<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlSelectState } from '@/features/control/types'
import SettingsField from '@/features/settings/components/elements/SettingField.vue'
import { computed, unref } from 'vue'

const { state } = useControlStore<ControlSelectState>()
const items = computed(() => unref(state.value.items))
</script>