<template>
  <v-icon :icon="icon" />
</template>

<script setup lang="ts">
import type { ControlToggleState } from '@/features/control/types'
import { mdiPinOff, mdiPinOutline } from '@mdi/js'
import { computed, toRefs } from 'vue'

const props = defineProps<ControlToggleState & { size?: number }>()
const { value } = toRefs(props)

const icon = computed(() => value.value ? mdiPinOff : mdiPinOutline)
</script>

<style scoped lang="scss"></style>