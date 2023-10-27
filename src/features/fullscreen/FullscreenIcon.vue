<template>
  <v-icon :icon="icon" />
</template>

<script setup lang="ts">
import type { ControlToggleState } from '@/features/control/types'
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
import { computed, toRefs } from 'vue'

const props = defineProps<ControlToggleState>()
const { value } = toRefs(props)

const icon = computed(() => (value.value ? mdiFullscreenExit : mdiFullscreen))
</script>

<style scoped lang="scss"></style>