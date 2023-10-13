<template>
  <div>
    <div class="mb-3">Controls</div>

    <div ref="el">
      <ControlListItem
        v-for="(item, i) of items"
        :key="item.key"
        :item="item"
        @remove="remove(i)"
      />
    </div>

    <ControlListAddMenu
      class="mt-5"
      @select="add"
    />
  </div>
</template>

<script setup lang="ts">
import ControlListAddMenu from '@/features/control/settings/list/ControlListAddMenu.vue'
import ControlListItem from '@/features/control/settings/list/ControlListItem.vue'
import type { PluggableControl } from '@/features/control/types'
import { usePluggableUtils } from '@/hooks/usePluggable/usePluggableUtils'
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

interface Props {
  items: PluggableControl[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:items', value: PluggableControl[]): void
}>()

const { clonePlugin } = usePluggableUtils()

const list = useVModel(props, 'items', emit)

const el = ref<HTMLElement>()

const draggable = useDraggable<PluggableControl>(el, list, {
  animation: 150,
  handle: '.drag-handle',
})

function add(item: PluggableControl) {
  list.value.push(clonePlugin(item))
}

function remove(index: number) {
  list.value.splice(index, 1)
}
</script>