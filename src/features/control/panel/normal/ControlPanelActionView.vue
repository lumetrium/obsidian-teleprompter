<template>
  <v-btn
    icon
    @click="state.value = new Date().getTime()"
  >
    <ControlLabel />
  </v-btn>
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'
import ControlLabel from '@/features/control/elements/ControlLabel.vue'

const { state } = useControlStore()
</script>