<template>
  <PanelItem
    v-for="(panel, i) of panels"
    :key="`${panel.key}:${i}`"
    :panel="panel"
  />
</template>

<script setup lang="ts">
import { usePanelFeature } from '@/features/panel'
import PanelItem from '@/features/panel/components/PanelItem.vue'
import { toRefs } from 'vue'

const { panels } = toRefs(usePanelFeature().useStore())
</script>