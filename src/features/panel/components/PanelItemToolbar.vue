<template>
  <v-app-bar
    v-show="state.isOpen"
    :height="height"
    :location="state.location as ('top' | 'bottom')"
  >
    <slot />
    <component
      :is="panel.components.content()"
      v-bind="state"
    />
    <PanelResizeHandle />
  </v-app-bar>
</template>

<script setup lang="ts">
import { usePanelStore } from '@/features/panel/store/panel.store'
import PanelResizeHandle from '@/features/panel/components/PanelResizeHandle.vue'
import {computed} from 'vue'

const { panel, state } = usePanelStore()

const height = computed(() => {
  const { isOpen, minHeight, height } = state.value
  if (!isOpen) return 0
  return height < minHeight ? minHeight : height
})
</script>

<style scoped lang="scss">
.v-app-bar {
  background: var(--background-secondary) !important;
  box-shadow: none !important;
  border-style: solid;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));

  border-bottom-width: 1px;

  &.v-app-bar--bottom {
    border-top-width: 1px;
    border-bottom: none;

  }
}
</style>
