<template>
  <div>
    <SettingField
      v-model="state.label"
      label="Label"
      desc="Displayed name"
    />
<!--    <SettingField
      v-model="state.desc"
      label="Description"
      desc="Displayed description"
    />-->
    <component
      :is="component"
      v-if="component"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import {
  useControlStore,
  useProvideControlStore,
} from '@/features/control/store/control.store'
import { computed } from 'vue'
import type { ControlState } from '@/features/control/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'

const { id } = useSettingItemStore<ControlState>()
const { state, components } = useControlStore() ?? useProvideControlStore(id)

const component = computed(() => components.getSettingsView())
</script>
