<template>
  <ControlPanelExpandView v-if="!isCompact" :style="expandStyle" />
  <ControlPanelMenuView v-else />
</template>

<script setup lang="ts">
import ControlPanelMenuView from '@/features/control/panel/normal/ControlPanelMenuView.vue'
import ControlPanelExpandView from '@/features/control/panel/normal/ControlPanelExpandView.vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import { computed } from 'vue'

const { isHorizontal, getIsCompact } = usePanelStore()

const isCompact = computed(() => getIsCompact({ width: 160, height: 260 }))

const expandStyle = computed(() => ({
  minWidth: isHorizontal.value ? '260px' : 0
}))
</script>
