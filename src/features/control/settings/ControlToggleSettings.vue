<template>
  <div>
    <SettingField
      label="State"
      desc="Current state"
    >
      <v-switch
        v-model="state.value"
        hide-details
        color="accent"
        :label="state.value ? state.activeLabel : state.inactiveLabel"
      />
    </SettingField>

    <SettingField
      v-model="state.activeLabel"
      label="Active label"
      desc="Displayed when turned on"
    />

    <SettingField
      v-model="state.inactiveLabel"
      label="Inactive label"
      desc="Displayed when turned off"
    />
  </div>
</template>

<script setup lang="ts">
import type { ControlToggleState } from '@/features/control/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'
import { useControlStore } from '@/features/control/store/control.store'

const { state } = useControlStore<ControlToggleState>()
</script>
