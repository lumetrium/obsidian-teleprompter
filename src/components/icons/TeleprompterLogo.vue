<template>
  <svg
      id="teleprompter-logo"
      :style="{ height: heightVal }"
      x="0"
      y="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 303 297"
  >
    <path
      d="M20.46,4H283.54c5,0,7.37,5.72,3.59,8.76L256,37.76A5.73,5.73,0,0,1,252.43,39H51.57A5.73,5.73,0,0,1,48,37.76l-31.11-25C13.09,9.72,15.43,4,20.46,4Z"
    />
    <path
      d="M45.29,46.51,11.18,16.65a5,5,0,0,0-8.14,5L37.16,153.86c1.47,5.69,9.84,4.63,9.84-1.24V50.27A5,5,0,0,0,45.29,46.51Z"
    />
    <path
      d="M257.71,46.51l34.11-29.86a5,5,0,0,1,8.14,5L265.84,153.86c-1.47,5.69-9.84,4.63-9.84-1.24V50.27A5,5,0,0,1,257.71,46.51Z"
    />
    <path
      d="M29.18,255.65,52.62,233a6.79,6.79,0,0,1,4.73-2H246.28a6.83,6.83,0,0,1,4.73,2l23.44,22.68c5.1,4.94,2,14.35-4.73,14.35H33.91C27.18,270,24.08,260.59,29.18,255.65Z"
    />
    <rect
      x="24.06"
      y="277"
      width="255.5"
      height="16"
      rx="8"
    />
    <path
      d="M244.86,47H58.36a4,4,0,0,0-4,4V220a4,4,0,0,0,4,4h186.5a4,4,0,0,0,4-4V51A4,4,0,0,0,244.86,47ZM188.24,184a3,3,0,0,1-3,3H87.32a3,3,0,0,1-3-3V172a3,3,0,0,1,3-3h97.92a3,3,0,0,1,3,3Zm30.65-29.33a3,3,0,0,1-3,3H87.32a3,3,0,0,1-3-3v-12a3,3,0,0,1,3-3H215.89a3,3,0,0,1,3,3Zm0-29.34a3,3,0,0,1-3,3H87.32a3,3,0,0,1-3-3v-12a3,3,0,0,1,3-3H215.89a3,3,0,0,1,3,3Zm0-29.33a3,3,0,0,1-3,3H87.32a3,3,0,0,1-3-3V84a3,3,0,0,1,3-3H215.89a3,3,0,0,1,3,3Z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  height?: string | number
  pulsePetal?: number
  stroked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  stroked: false,
})

const heightVal = computed(() =>
  isNumeric(props.height) ? props.height + 'px' : `${props.height}`,
)

function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value))
}
</script>

<style lang="scss" scoped>
svg {

  path,
  rect {
    fill: #796fdd
  }
}
</style>
