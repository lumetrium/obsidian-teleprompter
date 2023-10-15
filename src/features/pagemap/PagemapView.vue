<template>
  <div class="pagemap">
    <div
      ref="map"
      class="pagemap-container"
    >
      <div :style="mapStyle">
        <Content
          class="pagemap-content"
          static
        />
      </div>
    </div>

    <div
      class="pagemap-viewport"
      :style="viewportStyle"
      @mousedown="onDragStart"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import Content from '../content/Content.vue'
import { useContentFeature } from '@/features/content'
import { usePanelStore } from '@/features/panel/store/panel.store'

const contentStore = useContentFeature().useStore()

const { contentWidth, contentHeight, contentScrollTop, contentScrollHeight } =
  toRefs(contentStore)

const map = ref()
const isDragging = ref(false)
const viewportYPos = ref(0)

const mapWidth = ref<number>()

const { state } = usePanelStore()

watchEffect(() => (mapWidth.value = state.value.width))

function onDrag(e) {
  if (!isDragging.value || (!e.pageX && !e.pageY)) return
  const y = e.clientY
  if (viewportYPos.value === 0) viewportYPos.value = y
  const diff = y - viewportYPos.value
  const diffScaled = diff / viewportToHeightRatio.value
  viewportYPos.value = y
  contentStore.requestToScrollBy(diffScaled)
}

function onDragStart() {
  viewportYPos.value = 0
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

const scale = computed(() => mapWidth.value / contentWidth.value)

const scrollDistance = computed(() => ({
  top: contentScrollTop.value,
  bottom: contentScrollTop.value + contentHeight.value,
  center: contentScrollTop.value + contentHeight.value / 2,
}))

const scrollRatio = computed(() => ({
  top: scrollDistance.value.top / contentScrollHeight.value,
  bottom: scrollDistance.value.bottom / contentScrollHeight.value,
  center: scrollDistance.value.center / contentScrollHeight.value,
}))

const viewportToHeightRatio = computed(
  () => contentHeight.value / contentScrollHeight.value,
)

const distanceFromCenter = computed(() => {
  const multiplier = scrollRatio.value.center <= 0.5 ? -1 : 1
  return multiplier * Math.abs(scrollRatio.value.center - 0.5)
})

const handleScrollTop = computed(() => {
  const scrollHandleHeight = contentHeight.value * viewportToHeightRatio.value
  const height = contentHeight.value * scale.value
  return (
    scrollDistance.value.center * viewportToHeightRatio.value -
    height * scrollRatio.value.center +
    scrollHandleHeight * distanceFromCenter.value
  )
})

const mapScrollTop = computed(
  () => contentScrollTop.value * scale.value - handleScrollTop.value,
)

const mapStyle = computed(() => {
  if (!contentHeight.value) return { display: 'none' }

  return {
    position: 'absolute',
    height: `${contentScrollHeight.value}px`,
    width: `${contentWidth.value}px`,
    transform: `scale(${scale.value})`,
    transformOrigin: `0 0`,
    top: `${-mapScrollTop.value}px`,
  }
})

const viewportStyle = computed(() => {
  if (!contentHeight.value) return { display: 'none' }
  return {
    top: `${handleScrollTop.value}px`,
    height: `${contentHeight.value * scale.value}px`,
    cursor: isDragging.value ? 'grabbing' : 'grab',
  }
})

onMounted(() => {
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('mousemove', onDrag)

  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('touchmove', onDragEnd)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('mousemove', onDrag)

  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('touchmove', onDragEnd)
})
</script>

<style scoped lang="scss">
.pagemap,
.pagemap-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.pagemap-content {
  overflow: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
}

.pagemap-viewport {
  --mono-rgb-100: 255, 255, 255;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  z-index: 100;
  box-sizing: border-box;

  border-radius: 5px;
  background-color: rgba(var(--mono-rgb-100), 0.2);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 1);
  border: 1px solid transparent;

  transition:
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;

  &:hover {
    background-color: rgba(var(--mono-rgb-100), 0.25);
    border: 1px solid rgba(var(--mono-rgb-100), 0.65);
  }
}
</style>
