<template>
  <v-badge
    :content="state.value"
    :model-value="isTransparent"
  >
    <v-icon :icon="mdiCircleOpacity" />
  </v-badge>
</template>

<script setup lang="ts">
import type { ControlSliderState } from '@/features/control/types'
import { mdiCircleOpacity } from '@mdi/js'
import { useControlStore } from '@/features/control/store/control.store'
import { computed } from 'vue'

const { state } = useControlStore<ControlSliderState>()
const isTransparent = computed(() => state.value.value < 100)
</script>
