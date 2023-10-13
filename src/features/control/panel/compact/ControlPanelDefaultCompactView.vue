<template>
  <v-btn
    v-if="!control.components.content?.()"
    icon
    @click="control.state.value = new Date().getTime()"
  >
    <ControlIcon />
  </v-btn>
  <ControlPanelMenuView v-else />
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import ControlPanelMenuView from '@/features/control/panel/compact/ControlPanelMenuCompactView.vue'
import { useControlStore } from '@/features/control/store/control.store'

const { control } = useControlStore()
</script>