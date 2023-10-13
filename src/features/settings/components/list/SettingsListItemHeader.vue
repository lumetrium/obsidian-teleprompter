<template>
  <div class="settings-list-item-header">
    <SettingsIcon
      class="mr-3"
      :icon="icon"
      :component="setting.components.icon"
      :size="30"
    />
    <div>
      <span
        class="text-h5"
        v-text="state.name"
      />
      <span
        v-if="state?.desc"
        class="text-subtitle-1"
        v-text="state.desc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsIcon from '@/features/settings/components/elements/SettingsIcon.vue'
import { useSettingStore } from '@/features/settings/store/setting.store'

const { state, icon, setting } = useSettingStore()
</script>

<style scoped lang="scss">
.settings-list-item-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1em;
}
</style>