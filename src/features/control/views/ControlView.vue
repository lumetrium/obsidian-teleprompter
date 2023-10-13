<template>
  <component :is="components.getControlView()" />
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'

const { control, components } = useControlStore()
</script>
