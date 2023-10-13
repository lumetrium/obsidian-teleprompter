<template>
  <v-navigation-drawer
    v-model="state.isOpen"
    app
    clipped
    :location="state.location"
    permanent
    :width="state.width < state.minWidth ? state.minWidth : state.width"
    class="ground darken-1"
    :style="{ textAlign: state.alignment }"
  >
    <PanelResizeHandle />
    <component
      :is="panel.components.content?.()"
      v-bind="state"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { usePanelStore } from '@/features/panel/store/panel.store'
import PanelResizeHandle from '@/features/panel/components/PanelResizeHandle.vue'

const { panel, state } = usePanelStore()

</script>

<style scoped lang="scss">
.v-navigation-drawer {
  background: var(--background-secondary) !important;
  position: relative;
  border: none;

  &.v-navigation-drawer--left {
    box-shadow: 1px 0 0 0 rgba(var(--v-border-color), var(--v-border-opacity));
  }

  &.v-navigation-drawer--right {
    box-shadow: -1px 0 0 0 rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
