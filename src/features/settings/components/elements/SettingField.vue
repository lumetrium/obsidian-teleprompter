<template>
  <div class="settings-field">
    <div>
      <div
        class="settings-field-label"
        v-text="label"
      />
      <div
        class="settings-field-desc"
        v-text="desc"
      />
    </div>
    <div
      class="settings-field-content"
      :style="{ width: width + 'px' }"
    >
      <slot>
        <v-text-field
          v-model="vModel"
          class="settings-field-content-input"
          variant="plain"
          density="compact"
          hide-details
          :type="type"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number
  label: string
  desc?: string
  type?: 'text' | 'number'
  width?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: 'Value',
  desc: '',
  type: 'text',
  width: undefined,
})

const width = computed(() => {
  if (props.width) return props.width
  if (props.type === 'number') return 120
  return 200
})

const emit = defineEmits<{
  (e: 'update:modelValue'): void
}>()

const vModel = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', props.type === 'number' ? Number(value) : value)
  },
})
</script>

<style scoped lang="scss">
.settings-field {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid var(--divider-color);
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
}

.settings-field-label {
  font-size: 1em;
}

.settings-field-desc {
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: 0.25em;
}

.settings-field-content {
  :deep(.v-input) {
    width: 100%;
  }
}
</style>
