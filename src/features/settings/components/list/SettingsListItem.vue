<template>
  <div class="settings-list-item">
    <component :is="layoutComponent" v-if="layoutComponent" />
    <template v-else>
      <SettingsListItemHeader />
      <SettingsListItemContent />
    </template>
  </div>
</template>

<script setup lang="ts">
import SettingsListItemContent from '@/features/settings/components/list/SettingsListItemContent.vue'
import SettingsListItemHeader from '@/features/settings/components/list/SettingsListItemHeader.vue'
import { useProvideSettingStore } from '@/features/settings/store/setting.store'
import {computed} from 'vue'

interface Props {
  id: string
}

const props = defineProps<Props>()
const { components } = useProvideSettingStore(props.id)

const layoutComponent = computed(() => components.value.layout?.())
</script>

<style lang="scss" scoped>
.settings-list-item {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0.5em 0;
}
</style>
