<template>
  <ControlPanelActionView v-if="!components.getControlView()" />
  <ControlPanelExpandView v-else-if="!isCompact" />
  <ControlPanelMenuView v-else />
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'
import { computed } from 'vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import ControlPanelMenuView from '@/features/control/panel/normal/ControlPanelMenuView.vue'
import ControlPanelExpandView from '@/features/control/panel/normal/ControlPanelExpandView.vue'
import ControlPanelActionView from '@/features/control/panel/normal/ControlPanelActionView.vue'

const { components } = useControlStore()
const { getIsCompact } = usePanelStore()

const isCompact = computed(() => getIsCompact({ width: 160, height: 120 }))
</script>