<template>
  <v-badge
    :color="color"
    dot
  >
    <v-icon
      :icon="mdiFormatColorText"
      :size="size"
    />
  </v-badge>
</template>

<script setup lang="ts">
import { mdiFormatColorText } from '@mdi/js'
import { useControlStore } from '@/features/control/store/control.store'
import type { ControlColorState } from '@/features/control/types'
import { computed } from 'vue'

interface Props {
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: undefined,
})

const { state } = useControlStore<ControlColorState>()
const color = computed(() => state.value.value ?? 'inherit')
</script>

<style scoped lang="scss">
.v-icon {
  transition: none 0.2s ease-in-out;
  transition-property: background-color, box-shadow;
  border-radius: 100%;
}
</style>
