<template>
  <v-slider
    v-model="modelValue"
    :label="label"
    :step="step"
    :min="min"
    :max="max"
    :thumb-label="true"
    hide-details
  >
    <template #append>
      <v-text-field
        v-model="modelValue"
        hide-details
        density="compact"
        type="number"
        style="width: 70px"
      />
    </template>
  </v-slider>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  label?: string
  step?: number
  min?: number
  max?: number
  hideReset?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  step: 1,
  min: 0,
  max: 100,
  suffix: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped lang="scss">
input {
  margin: 0 5px;
}

.suffix {
  font-size: 0.9em;
  opacity: 0.8;
  margin-left: 2px;
}

.reset-btn {
  margin-left: 5px;
}
</style>
