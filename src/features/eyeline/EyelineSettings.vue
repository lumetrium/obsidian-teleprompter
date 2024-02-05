<template>
  <div>
    <SettingField
      v-model="indicatorTop"
      label="Position"
      desc="Offset from top in %"
      type="number"
    />

    <SettingField
      label="Custom color"
      desc="Use custom color for the indicator"
    >
      <v-switch
        :model-value="!!indicator.color"
        hide-details
        color="accent"
        :label="indicator.color ? 'Enabled' : 'Disabled'"
        @update:model-value="indicator.color = $event ? 'currentColor' : ''"
      />
    </SettingField>

    <v-color-picker
      v-if="!!indicator.color"
      v-model="indicator.color"
      elevation="0"
      width="100%"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import type { PanelState } from '@/features/panel/types'
import { computed, unref } from 'vue'
import type { EyelineIndicator } from '@/features/eyeline/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'

const { state } = useSettingItemStore<PanelState<EyelineIndicator>>()
const indicator = computed({
  get: () => unref(state.value.items)[0],
  set: (value) => (state.value.items = [value]),
})

const indicatorTop = computed({
  get: () => indicator.value.top,
  set: (value) => {
    if (value > 100) value = 100
    if (value < 0) value = 0
    indicator.value.top = value
  },
})
</script>
