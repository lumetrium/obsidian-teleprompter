<template>
  <v-color-picker
    ref="picker"
    v-model:mode="state.mode"
    :model-value="value"
    elevation="0"
    :width="width"
    :swatches="[presets]"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import type { ControlColorState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { useParentElement } from '@vueuse/core/index'

const { state } = useControlStore<ControlColorState>()
const { value, presets } = toRefs(state.value)

const picker = ref()

function updateValue(color: unknown) {
  const hexa = color.toString()
  value.value = hexa
}

// below is a workaround for adjusting the width of the color picker
// width="100%" doesn't work when the app is open in a separate window
// this is likely due to a bug with ResizeObserver in Obsidian

const width = ref(0)
const parentEl = useParentElement()
const interval = ref(null)

onMounted(() => (interval.value = setInterval(updateWidth, 100)))
onBeforeUnmount(() => interval.value && clearInterval(interval.value))
function updateWidth() {
  const parentWidth = parentEl.value?.clientWidth ?? 0
  if (width.value !== parentWidth) width.value = parentWidth
}
</script>

<style scoped lang="scss">
.v-color-picker {
  :deep(.v-color-picker-preview:last-child) {
    margin-bottom: 0;
  }
}
</style>
