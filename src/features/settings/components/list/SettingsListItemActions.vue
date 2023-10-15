<template>
  <div class="settings-list-item-actions">
    <SettingsAddListItem
      v-if="addableItems.length && setting.addItem"
      :items="addableItems"
      @add="setting.addItem($event)"
    />
    <v-spacer />
    <SettingsRestoreDefaultBtn @confirm="setting.restoreDefaults" />
  </div>
</template>

<script setup lang="ts">
import SettingsAddListItem from '@/features/settings/components/elements/SettingsAddListItem.vue'
import { useSettingStore } from '@/features/settings/store/setting.store'
import { SettingOptions } from '@/features/settings/types'
import SettingsRestoreDefaultBtn from '@/features/settings/components/elements/SettingsRestoreDefault.vue'
import { computed, unref } from 'vue'

const { setting } = useSettingStore()
const addableItems = computed(() => unref(setting.value.addableItems) ?? [])
</script>

<style scoped lang="scss">
.settings-list-item-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  gap: 10px;
}
</style>