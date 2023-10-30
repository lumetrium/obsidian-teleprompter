<template>
  <v-badge
    :content="state.value"
    :model-value="isTransparent"
  >
    <v-icon
      :icon="mdiCircleOpacity"
      :size="size"
    />
  </v-badge>
</template>

<script setup lang="ts">
import type { ControlSliderState } from '@/features/control/types'
import { mdiCircleOpacity } from '@mdi/js'
import { useControlStore } from '@/features/control/store/control.store'
import { computed } from 'vue'

interface Props {
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: undefined,
})

const { state } = useControlStore<ControlSliderState>()
const isTransparent = computed(() => state.value.value < 100)
</script>
