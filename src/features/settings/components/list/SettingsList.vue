<template>
  <div>
    <SettingsListItem
      v-for="item in items"
      :id="item.id"
      :key="item.id"
    />
  </div>
</template>

<script setup lang="ts">
import SettingsListItem from '@/features/settings/components/list/SettingsListItem.vue'
import type { SettingOptions, SettingState } from '@/features/settings/types'
import type { Pluggable } from '@/hooks/usePluggable/types'

interface Props {
  items: Pluggable<SettingState, SettingOptions>[]
}

const props = defineProps<Props>()
</script>