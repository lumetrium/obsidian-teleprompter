<template>
  <div
    ref="container"
    class="color-picker"
  >
    <v-color-picker
      v-bind="attrs"
      :model-value="pickerModelValue"
      :mode="mode"
      :width="width"
      @update:model-value="emit('update:modelValue', $event)"
      @update:mode="emit('update:mode', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

type ColorPickerMode = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'
type ColorPickerValue = string | Record<string, unknown>

interface Props {
  modelValue?: ColorPickerValue | null
  mode?: ColorPickerMode
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ColorPickerValue | null): void
  (e: 'update:mode', value: ColorPickerMode): void
}>()

const attrs = useAttrs()
const pickerModelValue = computed(() => props.modelValue ?? undefined)

const defaultWidth = 300
const resizeTolerance = 2
const width = ref(defaultWidth)
const container = ref<HTMLElement>()
const interval = ref<ReturnType<typeof setInterval> | null>(null)

onMounted(() => {
  updateWidth()
  interval.value = setInterval(updateWidth, 100)
})

onBeforeUnmount(() => interval.value && clearInterval(interval.value))

function updateWidth() {
  const containerWidth = container.value?.clientWidth || defaultWidth
  if (Math.abs(containerWidth - width.value) <= resizeTolerance) return
  width.value = containerWidth
}
</script>

<style scoped lang="scss">
.color-picker {
  width: 100%;
  min-width: 0;

  :deep(.v-color-picker-canvas) {
    width: 100% !important;
    height: 150px !important;
    transition-property: none !important;
  }

  :deep(.v-color-picker-canvas canvas) {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    min-width: 0;
    flex: 1 1 auto;
    transition-property: none !important;
  }

  :deep(.v-color-picker-preview:last-child) {
    margin-bottom: 0;
  }
}
</style>
