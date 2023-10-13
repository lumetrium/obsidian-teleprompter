<template>
  <Accordion ref="el">
    <SettingsAccordionItem
      v-for="(item, i) in items"
      :key="item.id"
      :item="item"
      :draggable="!!moveItem"
    />
  </Accordion>
</template>

<script setup lang="ts">
import Accordion from '@/components/accordion/Accordion.vue'
import SettingsAccordionItem from '@/features/settings/components/accordion/SettingsAccordionItem.vue'
import { useSettingStore } from '@/features/settings/store/setting.store'
import type { SettingItem } from '@/features/settings/types'
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

const { items, setting } = useSettingStore()

const moveItem = setting.value?.moveItem

const el = ref()

const draggable = useDraggable<SettingItem>(el, {
  animation: 150,
  handle: '.drag-handle',
  onUpdate(e) {
    moveItem(e.oldIndex, e.newIndex)
  },
})
</script>