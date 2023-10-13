<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    offset-y
    contained
  >
    <template #activator="slotData">
      <slot
        name="activator"
        v-bind="slotData"
      >
        <v-btn v-bind="slotData.props">
          <v-icon
            :size="25"
            :icon="mdiPlus"
          />
          <span
            class="mx-2"
            v-text="'Add'"
          />
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          @click="select(item)"
        >
          <v-list-item-title>
            <v-icon
              v-if="item.icon"
              class="mr-3"
              :icon="item.icon"
            />
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import type { SettingAddableItem } from '@/features/settings/types'
import { mdiPlus } from '@mdi/js'
import { ref } from 'vue'

interface Props {
  items: SettingAddableItem[]
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'add', id: string): void
}>()

const isOpen = ref(false)

function select(item: SettingAddableItem) {
  emit('add', item.id)
  isOpen.value = false
}
</script>
