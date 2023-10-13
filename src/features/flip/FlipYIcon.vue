<template>
  <v-icon
    :class="{ rotated: state.value }"
    :icon="mdiFlipVertical"
  />
</template>

<script setup lang="ts">
import { mdiFlipVertical } from '@mdi/js'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlToggleState } from '@/features/control/types'

const { state } = useControlStore<ControlToggleState>()
</script>

<style scoped lang="scss">
.v-icon {
  transition: transform 0.2s ease-in-out;
}
.rotated {
  transform: scaleY(-1);
}
</style>
