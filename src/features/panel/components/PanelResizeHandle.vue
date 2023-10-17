<template>
  <div
    ref="el"
    class="panel-resize-handle"
    :class="{ active: isResizing }"
    :data-location="state.location"
    @mousedown="isResizing = true"
    @touchstart="isResizing = true"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import { PanelLocation } from '@/features/panel/constants'

const isResizing = ref(false)
const pos = ref(0)
const el = ref()

const { state, isVertical, isHorizontal } = usePanelStore()

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('touchend', onMouseUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchend', onMouseUp)
})

function onTouchMove(e: TouchEvent) {
  const { clientX, clientY } = e.touches[0]
  onMouseMove({ clientX, clientY })
}

function onMouseUp() {
  isResizing.value = false
  pos.value = 0
}

function onMouseMove({
  clientX,
  clientY,
}: {
  clientX: number
  clientY: number
}) {
  if (!isResizing.value) return
  if (isHorizontal.value) {
    onMoveY(-clientY)
  } else if (isVertical.value) {
    onMoveX(clientX)
  }
}

function onMoveY(value: number) {
  if (!value) return
  if (pos.value === 0) pos.value = value
  const diff = pos.value - value
  const multiplier = state.value.location === PanelLocation.TOP ? 1 : -1
  state.value.height += diff * multiplier
  if (state.value.height < state.value.minHeight) {
    state.value.height = state.value.minHeight
  } else {
    pos.value = value
  }
}

function onMoveX(value: number) {
  if (!value) return
  if (pos.value === 0) pos.value = value
  const diff = pos.value - value
  const multiplier = state.value.location === PanelLocation.RIGHT ? 1 : -1
  state.value.width += diff * multiplier
  if (state.value.width < state.value.minWidth) {
    state.value.width = state.value.minWidth
  } else {
    pos.value = value
  }
}
</script>

<style scoped lang="scss">
.panel-resize-handle {
  position: absolute;

  &[data-location='right'] {
    cursor: col-resize;
    border-left-width: var(--divider-width);
    width: var(--divider-width-hover);
    height: 100%;
    top: 0;
    left: 0;
  }
  &[data-location='left'] {
    cursor: col-resize;
    border-left-width: var(--divider-width);
    width: var(--divider-width-hover);
    height: 100%;
    top: 0;
    right: 0;
  }
  &[data-location='top'] {
    cursor: row-resize;
    border-top-width: var(--divider-width);
    height: var(--divider-width-hover);
    width: 100%;
    left: 0;
    bottom: 0;
  }
  &[data-location='bottom'] {
    cursor: row-resize;
    border-top-width: var(--divider-width);
    height: var(--divider-width-hover);
    width: 100%;
    left: 0;
    top: 0;
  }

  //z-index: var(--layer-status-bar);
  z-index: 101;

  transition:
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    opacity 200ms ease-in-out;

  &:hover,
  &.active {
    background-color: var(--divider-color-hover);
    border-color: var(--divider-color-hover);
  }
}
</style>
