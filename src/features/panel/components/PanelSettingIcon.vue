<template>
  <span>
    <component
      :is="component"
      v-if="component"
      :size="size"
    />
    <v-icon
      v-else
      :icon="state.icon"
      :size="size"
    />
    <v-icon
      :size="size"
      :icon="locationIcon"
      class="ml-3"
    />
  </span>
</template>

<script setup lang="ts">
import { useProvidePanelStore } from '@/features/panel/store/panel.store'
import { computed } from 'vue'
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import type { PanelState, PluggablePanel } from '@/features/panel/types'

interface Props {
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
})

const { target } = useSettingItemStore<PanelState, PluggablePanel>()

const { location, locationItems, panel, state } = useProvidePanelStore(target)

const locationIcon = computed(
  () => locationItems.value.find(({ value }) => value === location.value).icon,
)

const component = computed(() => panel.value.components.icon?.())
</script>
