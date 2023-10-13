<template>
  <svg
    id="definer-logo"
    version="1.1"
    :style="{ height: heightVal }"
    :class="{ monotone: monotone !== false, stroked: stroked !== false }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0"
    y="0"
    viewBox="0 0 198.27 217.35"
    xml:space="preserve"
  >
    <path
      class="definer-book"
      d="M198.27,63.67V194.1c0.006,12.835-10.395,23.244-23.23,23.25c-0.003,0-0.007,0-0.01,0H82.62v-95.52
	c32.623-12.482,50.47-47.664,41.27-81.36h51.14C187.852,40.464,198.253,50.848,198.27,63.67z"
    />
    <path
      class="definer-lens"
      d="M70.15,130.18v83.32c0,2.13-3.35,3.85-7.47,3.85h-8.59c-4.12,0-7.46-1.72-7.46-3.84v-83.33
	c0-2.23,3.5-4,7.82-4h7.89C66.64,126.15,70.15,127.95,70.15,130.18z"
    />
    <path
      class="definer-lens"
      d="M58.39,20c21.202,0.006,38.386,17.198,38.38,38.4s-17.198,38.386-38.4,38.38
	c-21.198-0.006-38.38-17.192-38.38-38.39C20.012,37.193,37.193,20.017,58.39,20 M58.39,0C26.142,0,0,26.142,0,58.39
	s26.142,58.39,58.39,58.39s58.39-26.142,58.39-58.39C116.774,26.144,90.636,0.006,58.39,0z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  height?: string | number
  monotone?: boolean | 'contrast' | 'text'
  stroked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  monotone: false,
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
#definer-logo {
  margin-bottom: 0.2em;
  &.stroked path {
    stroke: black;
  }
}

path {
  transition: stroke cubic-bezier(0.25, 0.8, 0.5, 1);
  filter: drop-shadow(0 0 2px rgba(var(--text-rgb), 0.3));
  stroke: transparent;
  stroke-width: 1px;
}

.monotone path {
  fill: currentColor;
}
.definer-book {
  fill: #ffbf09;
}
.definer-lens {
  fill: #a36600;
}
</style>