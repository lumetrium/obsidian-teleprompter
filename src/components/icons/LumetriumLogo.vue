<template>
  <svg
    id="lumetrium-logo"
    :style="{ height: heightVal }"
    :class="{ stroked: stroked !== false }"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    viewBox="0 0 167 167"
    xml:space="preserve"
  >
    <rect
      class="lumetrium-core"
      x="27.83"
      y="27.8"
      width="111.34"
      height="111.34"
      rx="24.56"
      ry="24.56"
    />
    <path
      class="lumetrium-petal-2"
      :class="['lumetrium-petal-2', pulsePetal == 2 ? 'pulse' : '']"
      d="M166.51,12.24V43.35a12.28,12.28,0,0,1-12.28,12.28h-4.49V41.28a24.56,24.56,0,0,0-24.56-24.55H110.84V12.24A12.28,12.28,0,0,1,123.12,0h31.12A12.28,12.28,0,0,1,166.51,12.24Z"
      transform="translate(0.49)"
    />
    <path
      :class="['lumetrium-petal-3', pulsePetal == 3 ? 'pulse' : '']"
      d="M166.51,123.58v31.11A12.28,12.28,0,0,1,154.26,167H123.12a12.28,12.28,0,0,1-12.28-12.28v-4.48h14.35a24.57,24.57,0,0,0,24.56-24.56V111.3h4.49A12.28,12.28,0,0,1,166.51,123.58Z"
      transform="translate(0.49)"
    />
    <path
      :class="['lumetrium-petal-4', pulsePetal == 4 ? 'pulse' : '']"
      d="M55.18,150.21v4.48A12.28,12.28,0,0,1,42.93,167H11.78A12.28,12.28,0,0,1-.49,154.71V123.58A12.28,12.28,0,0,1,11.79,111.3h4.49v14.35a24.57,24.57,0,0,0,24.56,24.56Z"
      transform="translate(0.49)"
    />
    <path
      :class="['lumetrium-petal-1', pulsePetal == 1 ? 'pulse' : '']"
      d="M55.18,12.24v4.49H40.83A24.56,24.56,0,0,0,16.27,41.28V55.63H11.78A12.28,12.28,0,0,1-.49,43.35V12.24A12.28,12.28,0,0,1,11.78,0H42.9A12.28,12.28,0,0,1,55.18,12.24Z"
      transform="translate(0.49)"
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
  overflow: visible;
  transition: all cubic-bezier(0.25, 0.8, 0.5, 1);
  margin: 1px;

  &.stroked path,
  &.stroked rect {
    stroke: black;
  }
}
path,
rect {
  transition: stroke cubic-bezier(0.25, 0.8, 0.5, 1);
  filter: drop-shadow(0 0 2px rgba(var(--text-rgb), 0.3));
  stroke: transparent;
  stroke-width: 1px;
}
.lumetrium-core {
  fill: #e8e8e8;
}
.lumetrium-petal-1 {
  fill: #ffbf09;
}
.lumetrium-petal-2 {
  fill: #71db96;
}
.lumetrium-petal-3 {
  fill: #31b4dd;
}
.lumetrium-petal-4 {
  fill: #796fdd;
}
.pulse {
  animation: pulse 2s infinite;
  transform-origin: 100% 0;
}

@keyframes pulse {
  0% {
    transform: scale(0.98);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.98);
  }
}
</style>
