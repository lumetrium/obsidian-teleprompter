<template>
  <div
    ref="element"
    class="scroller"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

interface Props {
  speed?: number
  pause?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0,
  pause: false,
})

const element = ref<HTMLElement>()

const speed = computed(() => props.speed * 5)

const scrollDelay = computed(() =>
  100 - speed.value > 0 ? 100 - speed.value : 0,
)
const scrollStep = computed(
  () => 1 + (!scrollDelay.value ? speed.value / 100 : 0),
)
const timeout = ref<number>()

onMounted(() => scroll())
onBeforeUnmount(() => clearTimeout(timeout.value))

function scroll() {
  if (props.pause) return
  requestAnimationFrame(() => {
    if (props.speed) element.value?.scrollBy(0, scrollStep.value)
    if (timeout.value) clearTimeout(timeout.value)
    timeout.value = setTimeout(scroll, scrollDelay.value)
  })
}

watch(() => props.pause, scroll)
</script>

<style scoped lang="scss">
.scroller {
  position: absolute;
  left: 0;
  overflow-y: scroll;
  height: 100%;
  padding: 0.5em;
  word-break: normal;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;

  > ::v-deep(*:first-child) {
    //padding: 0 0 100%;
  }
}
</style>
