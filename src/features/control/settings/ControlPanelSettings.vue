<template>
  <ControlListSettings v-model:items="items" />
</template>

<script setup lang="ts">
import ControlListSettings from '@/features/control/settings/list/ControlListSettings.vue'
import type { PanelState } from '@/features/panel/types'
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import { Pluggable } from '@/hooks/usePluggable/types'
import {
  ControlOptions,
  ControlSliderState,
  ControlState,
  type PluggableControl,
} from '@/features/control/types'
import { mdiDrag } from '@mdi/js'
import { computed, isRef, ref, unref } from 'vue'

const { state } = useSettingItemStore<PanelState<PluggableControl>>()
const items = computed({
  get() {
    return unref(state.value.items)
  },
  set(value) {
    state.value.items = value
  },
})
</script>