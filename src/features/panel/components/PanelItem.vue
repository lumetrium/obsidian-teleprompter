<template>
  <PanelItemToolbar
    v-if="isHorizontal"
    class="panel-view"
    :data-transition="!hasFinishedAnimation"
  />
  <PanelItemDrawer
    v-else-if="isVertical"
    class="panel-view"
    :data-transition="!hasFinishedAnimation"
  />
</template>

<script setup lang="ts">
import type { PluggablePanel } from '@/features/panel/types'
import { toRefs, ref, watch } from 'vue'
import { useProvidePanelStore } from '@/features/panel/store/panel.store'
import PanelItemToolbar from '@/features/panel/components/PanelItemToolbar.vue'
import PanelItemDrawer from '@/features/panel/components/PanelItemDrawer.vue'

const props = defineProps<{ panel: PluggablePanel }>()
const { panel } = toRefs(props)
const { isHorizontal, isVertical, state } = useProvidePanelStore(panel)

const hasFinishedAnimation = ref(state.value.isOpen)
const toggleTimer = ref()

watch(
  () => state.value.isOpen,
  () => {
    clearInterval(toggleTimer.value)
    hasFinishedAnimation.value = false
    toggleTimer.value = setTimeout(() => {
      hasFinishedAnimation.value = true
    }, 300)
  },
)
</script>

<style scoped lang="scss">
.panel-view[data-transition='false'] {
  transition: none;
}
</style>
