<template>
  <ControlNumberSettings>
    <SettingField
      label="Reset on pause"
      desc='Apply "Reset value" to the countdown on pause'
    >
      <v-switch
        v-model="resetOnPause"
        hide-details
        color="accent"
        :label="resetOnPause ? 'Enabled' : 'Disabled'"
      />
    </SettingField>
  </ControlNumberSettings>
</template>

<script setup lang="ts">
import ControlNumberSettings from '@/features/control/settings/ControlNumberSettings.vue'
import SettingField from '@/features/settings/components/elements/SettingField.vue'
import { toRefs } from 'vue'
import { useCountdownFeature } from '@/features/countdown/index'

const { resetOnPause } = toRefs(useCountdownFeature().useStore())
</script>
