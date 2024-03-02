<template>
  <v-badge
    v-if="!isPlaying || state.value <= 0"
    :content="badgeLabel"
  >
    <v-icon
      :size="size"
      :icon="mdiTimerOutline"
    />
  </v-badge>
  <span
    v-else
    v-text="duration"
  />
</template>

<script setup lang="ts">
import type { ControlSliderState } from '@/features/control/types'
import { mdiTimerOutline } from '@mdi/js'
import { computed, toRefs } from 'vue'
import { useControlStore } from '@/features/control/store/control.store'
import { usePlayFeature } from '@/features/play'

interface Props {
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
})

const { state } = useControlStore<ControlSliderState>()
const { value: isPlaying } = toRefs(usePlayFeature().useStore())

const badgeLabel = computed(() =>
  state.value.value > 0 ? state.value.value.toFixed(0) : undefined,
)

const duration = computed(() => {
  const date = new Date(0)
  date.setSeconds(state.value.value)
  return date.toISOString().substring(14, 19)
})
</script>
