<template>
  <div
    ref="element"
    class="content-container"
    :style="containerModifiers.styles"
  >
    <div
      class="content"
      :style="contentModifiers.styles"
    >
      <ContentView class="content-view" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentView from '@/features/content/ContentView.vue'
import { useProvideContentStore } from '@/features/content/store/content.store'
import { computed, ref, toRefs, unref } from 'vue'
import { useContentDimensionsObserver } from '@/features/content/hooks/useContentDimensionsObserver'
import { useContentScroller } from '@/features/content/hooks/useContentScrolller'
import { useSpeedFeature } from '@/features/speed'
import { usePlayFeature } from '@/features/play'

const { content, modifiersList } = toRefs(useProvideContentStore())

interface Props {
  static?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  static: false,
})

const element = ref()

const { value: speed } = toRefs(useSpeedFeature().useStore())
const { value: isPlaying } = toRefs(usePlayFeature().useStore())

if (!props.static) {
  useContentDimensionsObserver(element)
  useContentScroller({ element, speed, isPlaying })
}

const containerModifiers = computed(() =>
  modifiersList.value.reduce(
    (acc, modifier) => ({
      styles: { ...acc.styles, ...(modifier.styles ?? {}) },
      classes: [...acc.classes, ...(modifier.classes ?? [])],
    }),
    {
      styles: {
        display: !content.value ? 'none' : 'block',
      },
      classes: [],
    },
  ),
)

const contentModifiers = computed(() =>
  modifiersList.value.reduce(
    (acc, modifier) => ({
      styles: { ...acc.styles, ...(modifier.contentStyles ?? {}) },
    }),
    {
      styles: {},
    },
  ),
)
</script>

<style scoped lang="scss">
.content-container {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow-y: scroll;
  word-break: normal;
  overflow-x: hidden;
  transition: none 200ms ease-in-out;
  transition-property: scale, background-color, color, font-size, line-height,
    letter-spacing;
}

.content {
  transition: none 100ms ease-in-out;
  transition-property: padding, margin;
  white-space: pre-line;
}
</style>
