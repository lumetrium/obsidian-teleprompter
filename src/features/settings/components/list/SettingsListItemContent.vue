<template>
  <div class="settings-list-item-content">
    <SettingsAccordion v-if="items" />
    <SettingsListItemActions />
  </div>
</template>

<script setup lang="ts">
import SettingsAccordion from '@/features/settings/components/accordion/SettingsAccordion.vue'
import SettingsListItemActions from '@/features/settings/components/list/SettingsListItemActions.vue'
import { useSettingStore } from '@/features/settings/store/setting.store'

const { items, setting } = useSettingStore()
</script>

<style scoped lang="scss">
.settings-list-item-content {
  display: flex;
  flex-flow: column;
  width: 100%;
}
</style>