<template>
  <div class="d-flex flex-column">
    <ControlButton
      :text="state.isDetailedView || !state.value ? null : String(state.value)"
      @click="state.isDetailedView = !state.isDetailedView"
    />
    <v-slide-y-transition hide-on-leave>
      <component
        :is="components.getControlView()"
        v-if="state.isDetailedView"
        class="control-panel-expand-content py-2"
        v-bind="bindings"
      />
    </v-slide-y-transition>
  </div>
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'
import ControlButton from '@/features/control/elements/ControlButton.vue'

const { components, state } = useControlStore()

interface Props {
  bindings?: Record<string, unknown>
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.control-panel-expand-content {
  background: var(--color-base-00);
  margin: 0 !important;
  padding: 0 0.8em;
}
</style>
