<template>
  <div
    ref="eyelineEl"
    class="eyeline"
  >
    <div
      ref="indicatorEl"
      class="eyeline-indicator"
      :style="indicatorStyles"
      @mousedown="onDragStart"
      @touchstart="onDragStart"
    >
      <EyelineIndicatorView :placement="panelState.location" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import EyelineIndicatorView from '@/features/eyeline/EyelineIndicatorView.vue'
import debounce from 'lodash/debounce'
import type { EyelineIndicator } from '@/features/eyeline/types'

const eyelineEl = ref<HTMLElement>()
const indicatorEl = ref<HTMLElement>()

const isDragging = ref(false)

const { state: panelState, patchState: patchPanelState } =
  usePanelStore<EyelineIndicator>()

const indicator = computed({
  get: () => panelState.value.items[0],
  set: (value) => patchPanelState({ items: [value] }),
})

watch(
  () => panelState.value.width,
  debounce(() => updateIndicatorPosition(), 100),
)

function updateIndicatorPosition(clientY?: number) {
  const containerRect = eyelineEl.value.getBoundingClientRect()
  const targetRect = indicatorEl.value.getBoundingClientRect()
  if (!containerRect.height) return

  if (clientY === undefined) {
    clientY =
      (indicator.value.top / 100) * containerRect.height +
      containerRect.top +
      targetRect.height / 2
  }

  let yPos = Math.max(clientY - containerRect.top - targetRect.height / 2, 0)

  if (yPos + targetRect.height > containerRect.height) {
    yPos = containerRect.height - targetRect.height
  }

  const top = Math.round((yPos / containerRect.height) * 100 * 100) / 100

  indicator.value = {
    ...indicator.value,
    top: top < 0 ? 0 : top,
  }
}

function onTouchMove(e: TouchEvent) {
  const { clientY, pageY, pageX } = e.touches[0]
  onDrag({ clientY, pageY, pageX })
}

function onDrag({ pageX, pageY, clientY }: Partial<MouseEvent & TouchEvent>) {
  if (!isDragging.value || (!pageX && !pageY)) return
  updateIndicatorPosition(clientY)
}

function onDragStart() {
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

const indicatorStyles = computed(() => {
  return {
    top: `${indicator.value?.top || 0}%`,
    cursor: isDragging.value ? 'grabbing' : 'grab',
    color: indicator.value?.color || 'currentColor',
  }
})

onMounted(() => {
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('touchmove', onTouchMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onTouchMove)
})
</script>

<style scoped lang="scss">
.eyeline {
  position: relative;
  height: 100%;
}

.eyeline-indicator {
  position: absolute;
  width: 100%;
}
</style>
