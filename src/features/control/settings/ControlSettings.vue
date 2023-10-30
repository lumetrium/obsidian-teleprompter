<template>
  <div>
    <div
      v-if="disabled"
      class="disabled-warning"
      v-text="disabledLabel"
    />
    <SettingField
      v-model="state.label"
      label="Label"
      desc="Displayed name"
    />
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
const { state, components, disabled } =
  useControlStore() ?? useProvideControlStore(id)

const component = computed(() => components.getSettingsView())

const disabledLabel = computed(() =>
  typeof disabled.value === 'string'
    ? disabled.value
    : 'This control is not available',
)
</script>

<style scoped lang="scss">
.disabled-warning {
  color: var(--color-red);
  margin-bottom: 2em;
  text-align: center;
  &:after {
    content: '';
    border-bottom: 1px solid var(--color-red);
    display: block;
    width: 50%;
    margin: 1em auto 0;
  }
}
</style>
