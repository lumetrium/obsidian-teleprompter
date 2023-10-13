<template>
  <component
    :is="component"
    v-if="component"
    :id="id"
    :size="size"
    :state="state"
  />
  <v-icon
    v-else
    :icon="svgIcon"
    :size="size"
  />
</template>

<script setup lang="ts">
import { type Component, computed } from 'vue'

interface Props {
  icon?: string
  component?: () => Component
  size?: number
  state?: unknown
  id?: string
}

const props = defineProps<Props>()

const svgIcon = computed(() => props.icon)

const component = computed(() => props.component?.())
</script>
