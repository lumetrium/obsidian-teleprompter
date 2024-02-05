<template>
  <svg class="svg-triangle" viewBox="0 0 100 100">
    <path v-if="placement === 'right'" d="M 10,50 90,10 90,90 Z" />
    <path v-if="placement === 'left'" d="M 90,50 10,90 10,10 z" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  placement: 'right' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'right',
})
</script>

<style scoped lang="scss">
.svg-triangle path {
  stroke-width: 10;
  fill: currentColor;
  stroke: currentColor;
  stroke-linejoin: round;
  stroke-linecap:round;
}
</style>
