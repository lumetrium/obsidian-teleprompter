<template>
  <div class="panel-settings">
    <SettingsField
      v-model="state.name"
      label="Name"
      desc="How the panel is called"
      width="200"
    />

    <SettingsField
      label="Location"
      desc="Where the panel is placed"
    >
      <SelectInput
        v-model="state.location"
        :items="availableLocationItems"
      />
    </SettingsField>

    <SettingsField
      v-if="isHorizontal"
      v-model="state.height"
      label="Height"
      desc="The height of the panel in pixels"
      type="number"
    />

    <SettingsField
      v-if="isVertical"
      v-model="state.width"
      label="Width"
      desc="The width of the panel in pixels"
      type="number"
    />

    <SettingsField
      v-if="isVertical && availableAlignmentItems.length > 1"
      label="Alignment"
      desc="How the content of the panel is aligned"
    >
      <SelectInput
        v-model="state.alignment"
        :items="availableAlignmentItems"
      />
    </SettingsField>

    <component
      :is="component"
      v-if="component"
    />
  </div>
</template>

<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue'
import type { PanelState, PluggablePanel } from '@/features/panel/types'
import SettingsField from '@/features/settings/components/elements/SettingField.vue'
import { useSettingItemStore } from '@/features/settings/store/setting-item.store'
import { computed, unref } from 'vue'
import { useProvidePanelStore } from '@/features/panel/store/panel.store'

const { state, components, target } = useSettingItemStore<
  PanelState,
  PluggablePanel
>()

const { panel, isHorizontal, isVertical, locationItems, alignmentItems } =
  useProvidePanelStore(target)

const availableLocationItems = computed(() => {
  const allowed = unref(panel.value.locations)
  return !allowed?.length
    ? locationItems.value
    : locationItems.value.filter((item) => allowed.includes(item.value))
})

const availableAlignmentItems = computed(() => {
  const allowed = unref(panel.value.alignments)
  return !Array.isArray(allowed)
    ? alignmentItems.value
    : alignmentItems.value.filter((item) => allowed.includes(item.value))
})

const component = computed(() => components.settings?.())
</script>
