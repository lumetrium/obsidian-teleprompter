<template>
  <v-tabs
    v-model="currentTabId"
    class="pb-0"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.id"
      class="mr-2"
      :value="tab.id"
      :text="tab.name"
    />
  </v-tabs>
  <v-divider class="mt-0 mb-5" />
  <v-window v-model="currentTabId">
    <v-window-item
      v-for="tab in tabs"
      :key="tab.id"
      :value="tab.id"
    >
      <SettingsList :items="tab.plugins" />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { useSettingsFeature } from '@/features/settings'
import SettingsList from '@/features/settings/components/list/SettingsList.vue'
import { computed, ref, toRefs, watch } from 'vue'

const store = useSettingsFeature().useStore()
const { tabs } = toRefs(store)
// console.warn(tabs.value)

const currentTabId = ref(tabs.value[0]?.id)
</script>

<style scoped lang="scss">
.v-tab {
  padding: 0 2em;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>