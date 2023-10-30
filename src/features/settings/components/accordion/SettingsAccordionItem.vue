<template>
  <AccordionItem
    v-model:state="isEnabled"
    :title="name"
    :subtitle="desc"
    :icon-size="25"
    :draggable="draggable"
  >
    <component
      :is="contentComponent"
      v-if="contentComponent"
    />

    <template #icon>
      <SettingsIcon
        :id="id"
        :icon="icon"
        :component="components?.icon"
        :size="30"
        :state="state"
      />
    </template>

    <v-divider class="my-5" />

    <div class="settings-accordion-item-actions">
      <SettingsDelete
        v-if="canRemove"
        @confirm="remove()"
      />
      <SettingsRestoreDefault @confirm="store.reset" />
    </div>
  </AccordionItem>
</template>

<script setup lang="ts">
import AccordionItem from '@/components/accordion/AccordionItem.vue'
import SettingsDelete from '@/features/settings/components/elements/SettingsDelete.vue'
import SettingsIcon from '@/features/settings/components/elements/SettingsIcon.vue'
import { useProvideSettingItemStore } from '@/features/settings/store/setting-item.store'
import { useSettingStore } from '@/features/settings/store/setting.store'
import type { SettingItem } from '@/features/settings/types'
import SettingsRestoreDefault from '@/features/settings/components/elements/SettingsRestoreDefault.vue'
import {computed, toRefs} from 'vue'

interface Props {
  item: SettingItem
  draggable?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const { item } = toRefs(props)

const store = useProvideSettingItemStore(item)
const settingStore = useSettingStore()

const { name, desc, icon, components, state, id, index, isEnabled } = store
const contentComponent = computed(() => components?.content?.())

const canRemove = computed(() => !!settingStore.setting.value.removeItem)

function remove() {
  settingStore.setting.value.removeItem(index.value)
}
</script>

<style lang="scss" scoped>
.settings-accordion-item-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
}
</style>