<template>
  <div>
    <SettingField
      v-model="indicatorTop"
      label="Position"
      desc="Offset from top in %"
      type="number"
    />

    <SettingField
      label="Background color"
      desc="Color for the panel's background"
    >
      <SelectInput
        v-model="background"
        item-title="label"
        item-icon="icon"
        item-value="id"
        :items="backgroundItems"
      />
    </SettingField>

    <div
      v-if="!!background && background !== 'follow-content'"
      class="mb-3 pb-4 border-b"
    >
      <v-color-picker
        v-model="background"
        elevation="0"
        width="100%"
      />
    </div>

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

    <div v-if="!!indicator.color">
      <v-color-picker
        v-model="indicator.color"
        elevation="0"
        width="100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import { computed, unref } from 'vue'
import type { EyelinePanelState } from '@/features/eyeline/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'
import SelectInput from '@/components/SelectInput.vue'

const { state } = useSettingItemStore<EyelinePanelState>()
const indicator = computed({
  get: () => unref(state.value.items)[0],
  set: (value) => (state.value.items = [value]),
})

const background = computed({
  get: () => state.value.data.background,
  set: (value) => (state.value.data.background = value),
})

const backgroundItems = computed(() => [
  { id: null, label: 'Default' },
  { id: 'follow-content', label: 'Follow content' },
  { id: '#000', label: 'Custom' },
])

const indicatorTop = computed({
  get: () => indicator.value.top,
  set: (value) => {
    if (value > 100) value = 100
    if (value < 0) value = 0
    indicator.value.top = value
  },
})
</script>
