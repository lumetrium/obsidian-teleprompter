<template>
  <span class="control-label">
    <ControlIcon class="control-label-icon" />
    <span class="control-label-text" v-text="state.label" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  useControlStore,
  useProvideControlStore,
} from '@/features/control/store/control.store'
import ControlIcon from '@/features/control/elements/ControlIcon.vue'

interface Props {
  id?: string
}

const props = defineProps<Props>()
const { control } = useControlStore() ?? useProvideControlStore(props.id)

const state = computed(() => control?.value?.state)
</script>

<style scoped lang="scss">
.control-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  max-width: 100%;
  .control-label-icon {
    flex-shrink: 0;
  }
  .control-label-text {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>