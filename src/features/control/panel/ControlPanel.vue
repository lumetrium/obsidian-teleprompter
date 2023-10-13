<template>
  <div
    class="control-panel"
    :class="{
      vertical: isVertical,
      horizontal: isHorizontal,
    }"
  >
    <ControlPanelView
      v-for="item of items"
      :key="item.key"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import ControlPanelView from '@/features/control/panel/ControlPanelView.vue'
import type { PluggableControl } from '@/features/control/types'
import { computed, unref } from 'vue'
import { usePanelStore } from '@/features/panel/store/panel.store'

const { isVertical, isHorizontal, state } = usePanelStore<PluggableControl>()
const items = computed(() => unref(state.value.items))
</script>

<style scoped lang="scss">
.control-panel {
  display: flex;
  overflow-y: auto;
  position: relative;

  &.horizontal {
    height: 100%;
  }

  &.vertical {
    width: 100%;
    flex-flow: column;
  }
}
</style>
