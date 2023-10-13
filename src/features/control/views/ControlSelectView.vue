<template>
  <v-list
    :selected="[value]"
    @update:selected="value = $event[0]"
  >
    <v-list-item
      v-for="item of unref(items)"
      :key="item.id"
      :value="item.id"
    >
      <v-list-item-title class="d-flex align-center">
        <v-icon
          v-if="item.icon"
          class="mr-2"
          :icon="item.icon"
        />
        <span v-text="item.label" />
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { ControlSelectState } from '@/features/control/types'
import { toRefs, unref } from 'vue'
import { useControlStore } from '@/features/control/store/control.store'

const { state } = useControlStore<ControlSelectState>()
const { value, items } = toRefs(state.value)
</script>
