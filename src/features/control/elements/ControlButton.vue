<template>
  <v-btn
    class="control-btn"
    icon
  >
    <ControlIcon class="control-btn__icon" />
    <div class="control-btn__content">
      <div
        :class="{ 'text-caption': !!text }"
        v-text="state.label"
      />
      <div v-text="text" />
    </div>
  </v-btn>
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
  text?: string
}

const props = defineProps<Props>()
const { control } = useControlStore() ?? useProvideControlStore(props.id)

const state = computed(() => control?.value?.state)
</script>

<style scoped lang="scss">
.v-btn.control-btn {
  display: flex;
  align-items: center;
  height: auto;
  width: auto;
  max-width: 100%;
  :deep(.v-btn__content) {
    gap: 0.8em;
    max-width: 100%;
    overflow: hidden;
    justify-content: inherit;
  }

  .control-btn__icon {
    flex-shrink: 0;
  }

  .control-btn__content {
    display: flex;
    flex-flow: column;
    justify-content: inherit;
    text-align: left;
  }

  .control-btn__content,
  .control-btn__content > * {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
